"use client";

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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StarIcon } from "lucide-react";

const TestimonialForm = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-lg p-6 font-semibold">Add Your Rating</Button>
      </DialogTrigger>
      <DialogContent>
        <form>
          <DialogHeader className="mb-8">
            <DialogTitle>Write a review</DialogTitle>
            <DialogDescription>
              Share your thoughts with other customers
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Your Meal Plan</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select your plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Diet Plan">Diet Plan</SelectItem>
                  <SelectItem value="Protein Plan">Protein Plan</SelectItem>
                  <SelectItem value="Royal Plan">Royal Plan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Description</Label>
              <Input />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Rating</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select your rating" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <SelectItem key={index} value={(index + 1).toString()}>
                      <div className="flex items-center gap-2">
                        {index + 1}{" "}
                        <StarIcon className="inline h-4 w-4" fill="yellow" />
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="mt-8">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TestimonialForm;
