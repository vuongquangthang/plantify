import { useState, useMemo, useCallback } from 'react';
import { searchProducts } from '../data/products';
import { blogPosts } from '../data/blog';
import type { SearchResult } from '../types';

export function useSearch() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const results: SearchResult = useMemo(() => {
    if (!query.trim() || query.length < 2) {
      return { products: [], posts: [] };
    }
    const q = query.toLowerCase();
    const products = searchProducts(query);
    const posts = blogPosts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
    return { products: products.slice(0, 5), posts: posts.slice(0, 3) };
  }, [query]);

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    setIsOpen(value.length >= 2);
  }, []);

  const clearSearch = useCallback(() => {
    setQuery('');
    setIsOpen(false);
  }, []);

  const closeSearch = useCallback(() => {
    setIsOpen(false);
  }, []);

  const totalResults = results.products.length + results.posts.length;

  return {
    query,
    results,
    isOpen,
    totalResults,
    handleSearch,
    clearSearch,
    closeSearch,
  };
}
