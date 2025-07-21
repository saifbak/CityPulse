export interface TMEvent {
    [x: string]: any;
}

export interface PageResponse {
    events: TMEvent[];
    page: number;
    totalPages: number;
}

const BASE = "https://app.ticketmaster.com/discovery/v2"
const TICKETMASTER_API_KEY = "WAcgANBttumCxn5nonGYKKqLmYUSJBZm"


export async function fetchEventsPage(
    { keyword = '', city = '', page = 0, size = 10 }: {
        keyword?: string;
        city?: string;
        page: number;
        size?: number;
    }
): Promise<PageResponse> {
    const qs = new URLSearchParams({
        apikey: TICKETMASTER_API_KEY,
        keyword,
        city,
        page: page.toString(),
        size: size.toString(),
    });


    const res = await fetch(`${BASE}/events.json?${qs}`);
    if (!res.ok) throw new Error(`Ticketmaster ${res.status}`);

    const json = await res.json();
    return {
        events: json?._embedded?.events ?? [],
        totalPages: json.page?.totalPages ?? 0,
        page,
    };
}

export async function fetchEventById(id: string): Promise<TMEvent> {
    const qs = new URLSearchParams({ apikey: TICKETMASTER_API_KEY });
    const res = await fetch(`${BASE}/events/${id}.json?${qs}`);
    if (!res.ok) throw new Error('Failed event fetch');
    return res.json();
}

export async function fetchEventsByIds(ids: string[]): Promise<TMEvent[]> {
    if (!ids.length) return [];
    const qs = new URLSearchParams({
        apikey: TICKETMASTER_API_KEY!,
        id: ids.join(','),
    });
    const res = await fetch(`${BASE}/events.json?${qs}`);
    const json = await res.json();
    return json?._embedded?.events ?? [];
}