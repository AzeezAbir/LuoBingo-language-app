export interface Word {
  id: number | string;
  dkh: string;
  kan: string;
}

export interface Selection {
  id: number | string | null;
  side: "dkh" | "kan" | null;
}
