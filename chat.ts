@import "tailwindcss";

@layer base {
  body {
    @apply bg-[#050505] text-white antialiased;
  }
}

/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.prose pre {
  @apply bg-[#141414] border border-white/10 rounded-xl p-4 my-4 overflow-x-auto;
}

.prose code {
  @apply text-indigo-400 font-mono text-sm;
}

.prose p {
  @apply mb-4 last:mb-0;
}

.prose h1, .prose h2, .prose h3 {
  @apply text-white font-bold mt-6 mb-2 first:mt-0;
}

.prose ul, .prose ol {
  @apply ml-6 mb-4 space-y-2;
}

.prose li {
  @apply list-disc;
}

