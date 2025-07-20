import React, { FC } from 'react'
import { ActivityIndicator, Pressable, Text } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters';

interface GlobalButtonProps {
    title: string;
    onPressed: () => void;
    disabled?: boolean;
    loading: boolean;
}

const GlobalButton: FC<GlobalButtonProps> = ({
    title,
    onPressed,
    disabled,
    loading,
}) => {
    return (
        <Pressable style={styles.button} onPress={onPressed} disabled={disabled}>
            {!loading ? <Text style={styles.buttonTitle}>
                {title}
            </Text> : <ActivityIndicator size={"small"} color={'white'} />}
        </Pressable>
    )
}

export default GlobalButton;


const styles = ScaledSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF6B00',
        color: 'white',
        width: '100%',
        height: '40@vs',
        borderRadius: '8@s'
    },
    buttonTitle: {
        color: '#ffffff',
        fontSize: '12@vs',
        fontWeight: '700'
    },
})