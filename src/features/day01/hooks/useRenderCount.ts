/* eslint-disable react-hooks/refs */
import { useRef } from 'react'

export function useRenderCount(): number {
  const ref = useRef(0);
  ref.current += 1;
  return ref.current;
}