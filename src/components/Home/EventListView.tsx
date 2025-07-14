import React, { useState, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { ScaledSheet } from 'react-native-size-matters';

/* Dummy type + data —— replace with your API call */
type Event = { id: string; title: string; city: string; date: string };
const dummy: Event[] = [
    { id: '1', title: 'Tech Conf', city: 'Dubai', date: '2025-07-20' },
    { id: '2', title: 'Music Fest', city: 'Abu Dhabi', date: '2025-07-23' },
    // …
];

const EventListView = () => {
    const [query, setQuery] = useState('');
    const [data, setData] = useState<Event[]>(dummy);

    /* filter client-side; replace with server call if you have one */
    useEffect(() => {
        const q = query.toLowerCase();
        setData(
            dummy.filter(
                ev =>
                    ev.title.toLowerCase().includes(q) ||
                    ev.city.toLowerCase().includes(q)
            )
        );
    }, [query]);

    const renderItem = ({ item }: { item: Event }) => (
        <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.meta}>
                {item.city} • {item.date}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Searchbar
                placeholder="Search by keyword or city"
                value={query}
                onChangeText={setQuery}
                style={styles.search}
            />

            <FlatList
                data={data}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    );
};

const styles = ScaledSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    search: { margin: '12@s', borderRadius: '8@ms' },
    card: {
        backgroundColor: '#f7f7f7',
        marginHorizontal: '12@s',
        marginBottom: '10@vs',
        padding: '14@s',
        borderRadius: '8@ms',
    },
    title: { fontSize: '16@ms', fontWeight: '600', color: '#333' },
    meta: { fontSize: '12@ms', color: '#666', marginTop: '4@vs' },
});

export default EventListView;
