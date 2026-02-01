"use client";

import React, { createContext, useContext, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, FileIcon, FolderIcon, FolderOpenIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TreeContextProps {
  selectedId: string | undefined;
  expandedItems: string[];
  onSelect: (id: string) => void;
  toggleExpand: (id: string) => void;
}

const TreeContext = createContext<TreeContextProps | undefined>(undefined);

export const Tree = ({
  className,
  children,
  selectedId,
  onSelect,
  expandedItems = [],
  onExpandChange,
}: {
  className?: string;
  children: React.ReactNode;
  selectedId?: string;
  onSelect: (id: string) => void;
  expandedItems?: string[];
  onExpandChange?: (items: string[]) => void;
}) => {
  const toggleExpand = (id: string) => {
    if (onExpandChange) {
      onExpandChange(
        expandedItems.includes(id)
          ? expandedItems.filter((item) => item !== id)
          : [...expandedItems, id]
      );
    }
  };

  const value = useMemo(
    () => ({ selectedId, expandedItems, onSelect, toggleExpand }),
    [selectedId, expandedItems, onSelect]
  );

  return (
    <TreeContext.Provider value={value}>
      <div className={cn("flex flex-col gap-0.5", className)}>{children}</div>
    </TreeContext.Provider>
  );
};

export const Folder = ({
  element,
  value,
  children,
  className,
}: {
  element: string;
  value: string;
  children?: React.ReactNode;
  className?: string;
}) => {
  const context = useContext(TreeContext);
  if (!context) throw new Error("Folder must be used within a Tree");

  const isExpanded = context.expandedItems.includes(value);

  return (
    <div className={cn("flex flex-col", className)}>
      <button
        onClick={() => context.toggleExpand(value)}
        className="flex items-center gap-2 px-2 py-1 rounded-sm hover:bg-white/5 transition-colors text-left group"
      >
        <motion.div
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight className="w-3.5 h-3.5 text-white/20 group-hover:text-white/40" />
        </motion.div>
        {isExpanded ? (
          <FolderOpenIcon className="w-4 h-4 text-blue-400/80 fill-blue-400/10" />
        ) : (
          <FolderIcon className="w-4 h-4 text-white/20 fill-white/5" />
        )}
        <span className="text-[13px] font-medium text-white/60 group-hover:text-white/80">{element}</span>
      </button>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden ml-[19px] border-l border-white/5"
          >
            <div className="flex flex-col gap-0.5 py-0.5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const File = ({
  value,
  className,
  children,
  onClick,
}: {
  value: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  const context = useContext(TreeContext);
  if (!context) throw new Error("File must be used within a Tree");

  const isSelected = context.selectedId === value;

  const handleClick = () => {
    context.onSelect(value);
    if (onClick) onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex items-center gap-2 px-2 py-1 rounded-sm transition-all text-left group relative",
        isSelected ? "bg-white/10 text-white" : "text-white/30 hover:bg-white/5 hover:text-white/60",
        className
      )}
    >
      <FileIcon className={cn("w-3.5 h-3.5", isSelected ? "text-cyan-400" : "text-white/10 group-hover:text-white/30")} />
      <div className="text-[13px] font-medium tracking-wide">{children}</div>
      {isSelected && (
        <motion.div 
          layoutId="active-nav-line"
          className="absolute left-0 w-[2px] h-3/5 bg-cyan-500 rounded-full"
        />
      )}
    </button>
  );
};
