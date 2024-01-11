import {Animated, View, TouchableOpacity} from 'react-native';
import CustomButton from './Button';
import {Colors, Scaler, Size} from '../styles';

export function MyTabBar({
  state,
  descriptors,
  navigation,
  position,
  bgColor,
  pv,
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: Size.SIZE_14,
        backgroundColor: bgColor,
        paddingVertical: pv,
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route + index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1, marginHorizontal: 4, paddingBottom: Size.SIZE_14}}>
            <CustomButton
              style={{
                height: Scaler.scaleSize(40),
                borderColor: isFocused
                  ? Colors.COLOR_BUTTON
                  : Colors.COLOR_LIGHT_GRAY,
                borderRadius: 4,
                borderWidth: 0.5,
              }}
              labelStyle={{
                color: isFocused ? Colors.COLOR_WHITE : Colors.COLOR_WHITE,
              }}
              mode={isFocused ? 'contained' : 'outlined'}>
              {label}
            </CustomButton>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
