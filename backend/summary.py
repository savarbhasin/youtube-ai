from langchain.chains.summarize import load_summarize_chain
from langchain_groq import ChatGroq
from langchain_community.document_loaders import YoutubeLoader
from langchain.prompts import PromptTemplate
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import ChatOpenAI
from concurrent.futures import ThreadPoolExecutor, as_completed
from langchain.docstore.document import Document
from dotenv import load_dotenv
import os
from langchain_google_genai import ChatGoogleGenerativeAI
import time

load_dotenv()
os.environ['GROQ_API_KEY'] = os.getenv('GROQ_API_KEY')




final_prompt = PromptTemplate.from_template("""
    Based on the provided summaries from different segments of the video, create a cohesive and engaging final summary. 
    The summary should be well-organized, with a clear structure and a professional tone. 
    Include an appropriate title and, if necessary, divide the content into relevant subsections to improve readability.
    The final output should be in MarkDown Format.

    Previous Summaries:
    {text}

    Final Summary (with title and subsections):
""")


prompt = PromptTemplate.from_template("""
    Summarize the following text, extracted from a YouTube video or website documentation, in no more than 100 words. 
    Ensure the summary is clear, concise, and captures the key points in a professional manner:
    {text}

    Short Summary (max 100 words):
""")


map_llm = ChatGroq(model ="llama3-8b-8192")
combine_llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-pro",
    temperature=0,
)




def process_chunk(chunk):
    chain = prompt | map_llm
    return chain.invoke({"text": chunk}).content

def summarize_url(video_id):
    docs = YoutubeLoader(video_id, add_video_info=False, language=['en','hi'], translation="en").load()

    documents = RecursiveCharacterTextSplitter(chunk_size=3000, chunk_overlap=250).split_documents(docs)
    completed_chunks = 0
    chunk_summaries = []
    with ThreadPoolExecutor(max_workers=30) as executor:
        future_to_chunk = {executor.submit(process_chunk, chunk): chunk for chunk in documents[:30]}  
        for i, future in enumerate(as_completed(future_to_chunk)):
            chunk_summaries.append(Document(page_content=future.result()))
            completed_chunks += 1
        if(completed_chunks < len(documents)):
            time.sleep(60)
         
            
    
    chain = load_summarize_chain(
        combine_llm, 
        chain_type="stuff", 
        prompt=final_prompt,

    )
    final_summary = chain.invoke(chunk_summaries)
    return final_summary['output_text']
    

