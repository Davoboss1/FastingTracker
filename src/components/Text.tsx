// src/components/AppText.tsx
import { getFontFamily } from '@/helpers';
import React from 'react';
import { Platform, Text, TextProps, TextStyle } from 'react-native';

interface AppTextProps extends TextProps {
    style?: TextStyle | TextStyle[];
    fontWeight?: "bold" | "semibold"
}

const AppText: React.FC<AppTextProps> = ({ fontWeight, style, children, ...rest }) => {
    return (
        <Text style={[{
            fontFamily: getFontFamily(fontWeight),
        }, style]} {...rest}>
            {children}
        </Text>
    );
};

export default AppText;