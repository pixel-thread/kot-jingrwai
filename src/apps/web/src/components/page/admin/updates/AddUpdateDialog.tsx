"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AppVersion, $Enums } from "@/lib/database/prisma/generated/prisma";
import http from "@/utils/http";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Loader2, CalendarIcon, PlusIcon, XIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { UpdateSchema } from "@/utils/validation/update";
import { ADMIN_UPDATE_ENDPOINT } from "@repo/constants";
import { useState } from "react";

type FormValues = z.infer<typeof UpdateSchema>;

interface AddUpdateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const PLATFORMS = [
  { value: $Enums.AppVersionPlatform.ANDROID, label: "Android" },
  { value: $Enums.AppVersionPlatform.IOS, label: "iOS" },
];

const TAGS = [
  { value: $Enums.AppVersionTags.BETA, label: "Beta", variant: "secondary" },
  { value: $Enums.AppVersionTags.STABLE, label: "Stable", variant: "default" },
  { value: $Enums.AppVersionTags.PATCH, label: "Patch", variant: "outline" },
  {
    value: $Enums.AppVersionTags.BUGFIX,
    label: "Bug-fix",
    variant: "destructive",
  },
] as const;

const UPDATE_TYPES = [
  { value: $Enums.AppVersionType.PTA, label: "PTA (Push to App Store)" },
  { value: $Enums.AppVersionType.OTA, label: "OTA (Over the Air)" },
];

export function AddUpdateDialog({ open, onOpenChange, onSuccess }: AddUpdateDialogProps) {
  const [descriptionItems, setDescriptionItems] = useState<string[]>([""]);
  const form = useForm<FormValues>({
    resolver: zodResolver(UpdateSchema),
    defaultValues: {
      version: "",
      title: "",
      description: [], // stirng[]
      platforms: [],
      type: $Enums.AppVersionType.OTA,
      releaseNotesUrl: "",
      downloadUrl: "",
      minSupportedVersion: "",
      releaseDate: new Date().toISOString(),
      tags: [],
      author: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: FormValues) =>
      http.post<AppVersion>(ADMIN_UPDATE_ENDPOINT.GET_UPDATES, data),
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Update created successfully");
        form.reset();
        onSuccess?.();
      }
      toast.error(data.message);
    },
  });

  const onSubmit = (data: FormValues) => {
    createMutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Add New App Update</DialogTitle>
          <DialogDescription>
            Create a new version update for your application. Fill in the details below.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Version and Title */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="version"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Version *</FormLabel>
                    <FormControl>
                      <Input placeholder="1.0.0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="minSupportedVersion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Min Supported Version *</FormLabel>
                    <FormControl>
                      <Input placeholder="0.9.0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title *</FormLabel>
                  <FormControl>
                    <Input placeholder="Bug Fixes and Performance Improvements" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Description Array */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Release Notes) *</FormLabel>
                  <div className="space-y-2">
                    {descriptionItems.map((item, index) => (
                      <div key={index} className="flex gap-2">
                        <div className="flex-1">
                          <Input
                            placeholder={`• Feature or fix #${index + 1}`}
                            value={item}
                            onChange={(e) => {
                              const newItems = [...descriptionItems];
                              newItems[index] = e.target.value;
                              setDescriptionItems(newItems);
                              // Update form value with non-empty items
                              field.onChange(newItems.filter((d) => d.trim()));
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && item.trim()) {
                                e.preventDefault();
                                setDescriptionItems([...descriptionItems, ""]);
                              }
                            }}
                          />
                        </div>
                        {descriptionItems.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              const newItems = descriptionItems.filter((_, i) => i !== index);
                              setDescriptionItems(newItems.length ? newItems : [""]);
                              field.onChange(newItems.filter((d) => d.trim()));
                            }}>
                            <XIcon className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setDescriptionItems([...descriptionItems, ""])}
                      className="w-full">
                      <PlusIcon className="mr-2 h-4 w-4" />
                      Add Description Item
                    </Button>
                  </div>
                  <FormDescription>
                    Add multiple bullet points describing this update. Press Enter to add a new
                    item.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Type and Release Date */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Update Type *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {UPDATE_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="releaseDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Release Date *</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}>
                            {field.value ? (
                              format(new Date(field.value), "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ? new Date(field.value) : undefined}
                          onSelect={(date) => field.onChange(date?.toISOString())}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Platforms */}
            <FormField
              control={form.control}
              name="platforms"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>Platforms</FormLabel>
                    <FormDescription>Select the platforms for this update</FormDescription>
                  </div>
                  <div className="flex gap-4">
                    {PLATFORMS.map((platform) => (
                      <FormField
                        key={platform.value}
                        control={form.control}
                        name="platforms"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={platform.value}
                              className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(platform.value)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...(field.value || []), platform.value])
                                      : field.onChange(
                                          field.value?.filter((value) => value !== platform.value)
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">{platform.label}</FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tags */}
            <FormField
              control={form.control}
              name="tags"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>Tags *</FormLabel>
                  </div>
                  <div className="flex gap-4">
                    {TAGS.map((tag) => (
                      <FormField
                        key={tag.value}
                        control={form.control}
                        name="tags"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={tag.value}
                              className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(tag.value)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, tag.value])
                                      : field.onChange(
                                          field.value?.filter((value) => value !== tag.value)
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                <Badge variant={tag.variant}>{tag.label}</Badge>
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                  <FormDescription>Select tags that describe this update</FormDescription>
                </FormItem>
              )}
            />

            {/* URLs */}
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="downloadUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Download URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/app.apk" {...field} />
                    </FormControl>
                    <FormDescription>Direct download link for the update</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="releaseNotesUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Release Notes URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/release-notes" {...field} />
                    </FormControl>
                    <FormDescription>Link to detailed release notes</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Author */}
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormDescription>Name of the person who created this update</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset();
                  onOpenChange(false);
                }}
                disabled={createMutation.isPending}>
                Cancel
              </Button>
              <Button type="submit" disabled={createMutation.isPending}>
                {createMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Update
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
