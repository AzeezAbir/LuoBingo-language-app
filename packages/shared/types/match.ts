export interface Word {
  id: number | string;
  kan: string;
  dkh: string;
  wrd?: string;
  description?: string;
  alt_words?: string[];
}

export interface Selection {
  id: number | string | null;
  side: "dkh" | "kan" | null;
}
