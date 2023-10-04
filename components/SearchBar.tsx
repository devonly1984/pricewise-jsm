"use client";

import { scrapeAndStoreProduct } from "@/lib/actions";
import { FormEvent, useState } from "react";
const isValidAmazonProductURL = (url: string) => {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;
    if (
      hostname.includes("amazon.com") ||
      hostname.includes("amazon.") ||
      hostname.endsWith("amazon")
    ) {
      return true;
    }
  } catch (error: any) {
    console.log(`failed to parse url ${error.message}`);
    return false;
  }
};
const SearchBar = () => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValidLink = isValidAmazonProductURL(input);
    if (!isValidLink) return console.log("Please enter a valid amazon url");
    try {
      
      setIsLoading(true);
      const scrapedProduct = await scrapeAndStoreProduct(input);
      if (!scrapedProduct!) return;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form
      action=""
      className="flex flex-wrap gap-4 mt-12"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter Product Link"
        className="searchbar-input"
      />
      <button disabled={!input} type="submit" className="searchbar-btn">
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  );
};

export default SearchBar;
