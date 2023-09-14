"use client";
import React, { useState, useEffect } from 'react';
import { FaFile, FaArrowRight, FaCopy, FaSpinner } from 'react-icons/fa';
import axios from 'axios';
import { useToast } from "@/components/ui/use-toast"
import { Button } from '@/components/ui/button';

export default function IndexPage() {
  const [text, setText] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isHeaderRedacted, setHeaderRedacted] = useState<boolean>(false);
  const { toast } = useToast()

  useEffect(() => {
    const interval = setInterval(() => {
      setHeaderRedacted(prevState => !prevState);
    }, isHeaderRedacted ? 1000 : 9000);

    return () => clearInterval(interval);
  }, [isHeaderRedacted]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setText(reader.result as string);
      };
      reader.readAsText(file);
    }
  };

  const handleRedact = async () => {
    if (!text) {
      toast({
        title: "No Text",
        description: "Please provide text to redact",
        duration: 2000,
      });
      return;
    }

    const apiKey = localStorage.getItem('pangeaApiKey');
    if (!apiKey) {
      toast({
        title: "No API Key",
        description: "Please set your Pangea API Key in settings",
        duration: 2000,
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        'https://redact.aws.us.pangea.cloud/v1/redact',
        { text },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      setResult(response.data.result.redacted_text);
      toast({
        title: "Redaction Status",
        description: response.data.summary,
        duration: 2000,
      });
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast({
          title: "Invalid API Key",
          description: "Please set your Pangea API Key in settings",
          duration: 2000,
        });
        return;
      } else if (error.response?.status === 429) {
        toast({
          title: "Too Many Requests",
          description: "Please wait a few minutes before trying again",
          duration: 2000,
        });
        return;
      } else if (error.response?.status === 403) {
        toast({
          title: "Redaction Error",
          description: (error.response?.data?.error || "A permissions error occurred") + ": Please verify your API credentials.",
          duration: 10000,
        });
      } else {
        toast({
          title: "Redaction Error",
          description: error.message || "An unknown error occurred",
          duration: 10000,
        });
      }
    }
    setIsLoading(false);
  };

  const copyResultToClipboard = () => {
    navigator.clipboard.writeText(result);
    toast({
      title: "Copied",
      description: "Result copied to clipboard",
      duration: 2000,
    });
  };

  return (
    <section className="flex flex-col items-center min-h-screen pb-24">
      <h1 className="text-center text-4xl font-bold mt-8 mb-8 relative inline-block">
        Pangea&nbsp;
        <span
          className="relative inline-block"
        >
          Redactor
        </span>
        <span
          className={`absolute inset-y-0 ${isHeaderRedacted ? 'left-0' : 'left-auto'} right-0  mt-2 h-[70%] bg-primary transition-all duration-700 ${isHeaderRedacted ? 'w-full' : 'w-0'
            }`}
          style={{
            top: '0',
          }}
        ></span>
      </h1>
      <div className="flex flex-col lg:flex-row w-3/4 gap-4 mb-4">
        <textarea
          className="border-4 border-primary w-full lg:w-1/2 p-4 overflow-y-scroll resize-none rounded"
          style={{ height: '50vh' }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Enter data to redact here...'
        />
        <div className="self-center text-2xl transform transition-transform duration-500 lg:rotate-0 rotate-90">
          <FaArrowRight />
        </div>
        <div className="relative w-full lg:w-1/2">
          <textarea
            className="border-4 border-primary w-full p-4 overflow-y-scroll resize-none rounded"
            style={{ height: '50vh' }}
            value={result}
            onChange={(e) => setResult(e.target.value)}
          />
          <button
            onClick={copyResultToClipboard}
            className="absolute top-3 right-6 text-gray-400 hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray"
          >
            <FaCopy size={26} />
          </button>
        </div>
      </div>
      <label className="text-primary font-bold mb-2 flex gap-2 cursor-pointer">
        <FaFile className="mt-1" />Upload a File
        <input
          type="file"
          className="hidden"
          onChange={handleFileUpload}
        />
      </label>
      <div className="flex space-x-4 mt-4">
        <Button
          className={`bg-red-500 text-white py-2 px-4 rounded ${isLoading ? 'opacity-50' : ''} w-20`}
          onClick={handleRedact}
          disabled={isLoading}
        >
          {isLoading ? <span className="animate-spin"><FaSpinner /></span> : 'Redact'}
        </Button>
        <Button className="bg-gray-500 text-white py-2 px-4 rounded" onClick={() => {
          setText('');
          setResult('');
        }}>Clear</Button>
      </div>
    </section>
  );
}
