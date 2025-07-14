import React from 'react';
import {
    View,
    Text,
    Pressable,
    StyleProp,
    ViewStyle,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    ScaledSheet, moderateScale,
} from 'react-native-size-matters';
import { Icons } from '../assets';
import { useLocalizationContext } from '../core/context/LocalizationContext';
// import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
    title: string;
    onBack?: () => void;
    rightSlot?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    bgColor?: string;
    accentColor?: string;
};

const Header: React.FC<Props> = ({
    title,
    onBack,
    rightSlot,
    style,
    bgColor = '#fff',
    accentColor = '#29ABE2',
}) => {
    const { language } = useLocalizationContext();

    const isRtl = language === 'ar' ? true :false;
    const arrow = isRtl ? Icons.rightIcon : Icons.leftIcon;
    return (
        <SafeAreaView edges={['top']} style={[styles.safe, { backgroundColor: bgColor }]}>
            <View style={[styles.row, isRtl && {flexDirection:'row-reverse'},  style]}>
                {onBack ? (
                    <Pressable hitSlop={10} onPress={onBack} style={styles.iconBtn}>
                        <Image source={arrow} style={{ width: 20, height: 20, resizeMode: "contain" }} />
                    </Pressable>
                ) : (
                    <View style={styles.iconPlaceholder} />
                )}
                <Text style={[styles.title, { color: accentColor }]} numberOfLines={1}>
                    {title}
                </Text>

                {rightSlot ? (
                    <View style={styles.right}>{rightSlot}</View>
                ) : (
                    <View style={styles.iconPlaceholder} />
                )}
            </View>
        </SafeAreaView>
    );
};

export default Header;

const styles = ScaledSheet.create({
    safe: { width: '100%' },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: '12@s',
        paddingVertical: '10@vs',
    },
    title: {
        flex: 1,
        textAlign: 'center',
        fontSize: '18@ms',
        fontWeight: '600',
    },
    iconBtn: { padding: '4@s' },
    iconPlaceholder: { width: moderateScale(22) },
    right: { minWidth: moderateScale(22), alignItems: 'flex-end' },
});
