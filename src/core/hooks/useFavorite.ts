import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import firestore from '@react-native-firebase/firestore';
import useAuth from './useAuth';
import { StorageService } from '../services/storage';

const KEY = 'favs';

async function getLocalFavs(): Promise<string[]> {
    const response = await StorageService.getItem<string[]>(KEY);
    return response ?? [];
}

async function setLocalFavs(arr: string[]) {
    await StorageService.setItem(KEY, arr);
}

export function useFavourites() {
    const qc = useQueryClient();
    const { user } = useAuth();

    const { data: ids = [] } = useQuery({
        queryKey: ['favs'],
        queryFn: getLocalFavs,
        staleTime: Infinity,
    });

    const toggle = useMutation({
        mutationFn: async (id: string) => {
            const event = ids.includes(id) ? ids.filter(x => x !== id) : [...ids, id];
            await setLocalFavs(event);
            if (user) {
                await firestore().doc(`users/${user.uid}`).set({ favs: event }, { merge: true });
            }
            return event;
        },
        onSuccess: () => qc.invalidateQueries({ queryKey: ['favs'] }),
    });

    return { favIds: ids, toggleFav: toggle.mutateAsync };
}
