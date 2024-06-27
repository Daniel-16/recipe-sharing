import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Copy } from "lucide-react";
import { useEffect, useState } from "react";

export default function ShareRecipe({ link }: any) {
  const [copied, setCopied] = useState<string>("");
  const copyToClipBoard = () => {
    const linkInput: any = document.getElementById("link");
    linkInput.select();
    navigator.clipboard.writeText(linkInput.value);
    setCopied("Link copied to clipboard!");
  };
  useEffect(() => {
    setTimeout(() => {
      setCopied("");
    }, 3000);
  }, [copied]);
  return (
    <div className="absolute my-auto right-0 top-0 mt-2 mr-2 w-10 flex items-center justify-center p-1 bg-gray-200 border-2 border-[#7e525f] rounded-md shadow-lg hover:cursor-pointer hover:bg-white active:bg-gray-200">
      <Dialog>
        <DialogTrigger asChild>
          <svg
            className="w-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 12C9 13.3807 7.88071 14.5 6.5 14.5C5.11929 14.5 4 13.3807 4 12C4 10.6193 5.11929 9.5 6.5 9.5C7.88071 9.5 9 10.6193 9 12Z"
              stroke="#7e525f"
              strokeWidth="1.5"
            />
            <path
              d="M14 6.5L9 10"
              stroke="#7e525f"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M14 17.5L9 14"
              stroke="#7e525f"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M19 18.5C19 19.8807 17.8807 21 16.5 21C15.1193 21 14 19.8807 14 18.5C14 17.1193 15.1193 16 16.5 16C17.8807 16 19 17.1193 19 18.5Z"
              stroke="#7e525f"
              strokeWidth="1.5"
            />
            <path
              d="M19 5.5C19 6.88071 17.8807 8 16.5 8C15.1193 8 14 6.88071 14 5.5C14 4.11929 15.1193 3 16.5 3C17.8807 3 19 4.11929 19 5.5Z"
              stroke="#7e525f"
              strokeWidth="1.5"
            />
          </svg>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
              Anyone who has this link will be able to view this.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label className="sr-only">Link</Label>
              <Input
                id="link"
                defaultValue={`https://cookandshare.vercel.app/recipe/${link}`}
                readOnly
              />
            </div>
            <Button
              type="submit"
              size="sm"
              className="px-3"
              onClick={copyToClipBoard}
            >
              <span className="sr-only">Copy</span>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          {copied !== "" && <p className="text-green-700 text-sm">{copied}</p>}
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <button
                type="button"
                className="bg-gray-800 py-2 px-3 text-white rounded-lg hover:bg-gray-700"
              >
                Close
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
