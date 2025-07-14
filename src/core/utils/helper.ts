export interface CardEvent {
    id: string;
    title: string;
    subtitle: string;
    date: string;
    image: string;
}

export function toCardEvent(tm: any): CardEvent {
    const img =
        tm.images?.find((i: { ratio: string; }) => i.ratio === '3_2')?.url ||
        tm.images?.find((i: { ratio: string; }) => i.ratio === '16_9')?.url ||
        '';

    const venue = tm._embedded?.venues?.[0];
    const cityStr = venue?.city?.name ?? '—';
    const venueStr = venue?.name ?? '';

    const raw = tm.dates.start.dateTime || `${tm.dates.start.localDate}T${tm.dates.start.localTime ?? '00:00'}`;
    const nice = new Date(raw).toLocaleString(undefined, {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    });

    return {
        id: tm.id,
        title: tm.name,
        subtitle: `${cityStr}${venueStr ? ' • ' + venueStr : ''}`,
        date: nice,
        image: img,
    };
}
