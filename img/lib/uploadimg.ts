import { supabase } from './supabase';

export const uploadImage = async (file: File): Promise<{ publicUrl: string } | null> => {
  const fileName = `${Date.now()}_${file.name}`;


  //bucket machmal nicht gefunden?!

  const { data, error } = await supabase.storage
    .from('img')
    .upload(`public/${fileName}`, file);

  if (error) {
    console.error('Error uploading image:', error.message);
    return null;
  }


  const { data: publicUrlData } = supabase
    .storage.from('img').getPublicUrl(`public/${fileName}`);

  const publicUrl = publicUrlData.publicUrl;

  return { publicUrl };
};
