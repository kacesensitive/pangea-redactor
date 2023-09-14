"use client";
import Link from "next/link";
import { useState } from "react";
import { FaCog } from "react-icons/fa";
import { useToast } from "@/components/ui/use-toast";

import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function SiteHeader() {
  const [secureInput, setSecureInput] = useState(localStorage.getItem('pangeaApiKey') || '');
  const { toast } = useToast();

  const handleSave = () => {
    localStorage.setItem('pangeaApiKey', secureInput);
    toast({
      title: "Success",
      description: "Pangea API Key saved successfully",
      duration: 2000,
    });
  };

  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Popover>
              <PopoverTrigger>
                <div
                  className={buttonVariants({
                    size: "icon",
                    variant: "ghost",
                  })}
                  style={{ transition: "transform 0.3s" }}
                >
                  <FaCog className="h-5 w-5 transform transition-transform duration-300 hover:rotate-180" />
                  <span className="sr-only">Settings</span>
                </div>
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex flex-col space-y-2 text-center">
                  <span className="text-sm text-primary">
                    Enter your <a className="text-blue-400" href="https://pangea.cloud/docs/api/" target="_blank" rel="noopener noreferrer">Pangea API Key</a> to save it for future use.
                  </span>
                  <input
                    type="password"
                    placeholder="Pangea API Key"
                    value={secureInput}
                    onChange={(e) => setSecureInput(e.target.value)}
                    className="p-2 border rounded"
                  />
                  <button
                    className="p-2 border rounded bg-blue-500 text-white hover:bg-blue-600 transition-color duration-300"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              </PopoverContent>
            </Popover>
            <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
