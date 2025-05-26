import { toast } from "sonner";


export function handleError(error: unknown) {
  const message = 
    error instanceof Error ? error.message :
    typeof error === 'string' ? error :
    'Beklenmeyen bir hata oluştu';

  toast('Beklenmeyen bir hata oluştu', { description: message });

  if (process.env.NODE_ENV === 'development') {
    console.error(error);
  }
}