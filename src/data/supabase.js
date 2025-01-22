import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function saveCanvasData(
  stickers,
  designers,
  backgroundColor,
  dotColor,
  scale,
  existingCanvasId = null
) {
  let result;
  const dataToUpdate = {
    stickers: stickers,
    designers: designers,
    backgroundColor: backgroundColor,
    dotColor: dotColor,
    scale: scale,
  };
  if (existingCanvasId) {
    result = await supabase
      .from('moji_data')
      .update(dataToUpdate)
      .eq('id', existingCanvasId)
      .select();
  } else {
    result = await supabase.from('moji_data').insert(dataToUpdate).select();
  }
  const { data, error } = result;
  if (error) throw error;
  return data[0].id;
}

async function getCanvasData(id) {
  console.log('Supabase fetching ID:', id); // Debug
  const { data, error } = await supabase.from('moji_data').select('*').eq('id', id).single();
  console.log('Supabase response:', { data, error }); // Debug
  if (error) throw error;
  return data;
}

export { saveCanvasData, getCanvasData };
