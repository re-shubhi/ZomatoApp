import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {useStyles} from 'react-native-unistyles';
import {modelStyles} from '@unistyles/modelStyles';
import CustomText from '@components/global/CustomText';
import Icon from '@components/global/Icon';
import {Colors} from '@unistyles/Constants';
import DottedLine from '@components/ui/DottedLine';
import ScalePress from '@components/ui/ScalePress';
import AnimatedNumbers from 'react-native-animated-numbers';
import {RFValue} from 'react-native-responsive-fontsize';
import {useAppDispatch} from '@states/reduxHook';

function transformSelectedOptions(
  selectedOption: any,
  customizationOption: any,
) {
  return Object.entries(selectedOption).map(([type, index]) => {
    const customization = customizationOption?.find(
      (option: any) => option.type === type,
    );
    if (!customization || !customization?.options[index as number]) {
      throw new Error(`Invalid customization type or index for ${type} `);
    }
  });
}

const AddItemModal: FC<{item: any; restaurant: any; onClose: () => void}> = ({
  restaurant,
  item,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const {styles} = useStyles(modelStyles);
  const [data, setData] = useState({
    quantity: 1,
    price: item?.price,
    selectedOption: {} as Record<string, number>,
  });

  useEffect(() => {
    const defaultSelectedOption: Record<string, number> = {};
    let initialPrice = item?.price || 0;
  
    item?.customizationOptions?.forEach((customization: any) => {
      if (customization?.required) {
        const defaultOptionIndex = customization?.options.findIndex(
          (option: any) => option?.isDefault || option?.required,
        );
  
        if (defaultOptionIndex !== -1) {
          defaultSelectedOption[customization.type] = defaultOptionIndex;
          initialPrice +=
            customization?.options[defaultOptionIndex]?.price || 0;
        }
      }
    });
  
    setData(prevData => ({
      ...prevData,
      selectedOption: defaultSelectedOption,
      price: initialPrice,
    }));
  }, [item]);
  

  const removeCartHandler = () => {};

  const addCartHandler = () => {};

  const addItemIntoCart = () => {};

  return (
    <View>
      <View style={styles.headerContainer}>
        <View style={styles.flexRowGap}>
          <Image source={{uri: item?.image}} style={styles.headerImage} />
          <CustomText fontFamily="Okra-Medium" fontSize={12}>
            {item?.name}
          </CustomText>
        </View>
        <View style={styles.flexRowGap}>
          <TouchableOpacity style={styles.icon}>
            <Icon
              name="bookmark-outline"
              iconFamily="Ionicons"
              color={Colors.primary}
              size={16}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <Icon
              name="share-outline"
              iconFamily="Ionicons"
              color={Colors.primary}
              size={16}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {item?.customizationOptions?.map(
          (customization: any, index: number) => {
            return (
              <View style={styles.subContainer} key={index}>
                <CustomText fontFamily="Okra-Medium">
                  {customization?.type}
                </CustomText>
                <CustomText fontFamily="Okra-Medium" variant="h7" color="#888">
                  {customization?.required
                    ? 'Required • Select any 1 option'
                    : `Add on your ${customization?.type}`}
                </CustomText>
                <DottedLine />
                {customization.options?.map((option: any, i: number) => {
                  return (
                    <TouchableOpacity
                      key={i}
                      style={styles.optionContainer}
                      onPress={() => {}}>
                      <CustomText fontFamily="Okra-Medium" fontSize={11}>
                        {option.name}
                      </CustomText>
                      <View style={styles.flexRowGap}>
                        <CustomText fontSize={11} fontFamily="Okra-Medium">
                          ₹{option.price}
                        </CustomText>
                        <Icon
                          name= {
                            data?.selectedOption[customization.type] === i ?
                            'radiobox-marked':"radiobox-blank"
                          }
                          iconFamily="MaterialCommunityIcons"
                          color="#888"
                          size={16}
                        />
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          },
        )}
      </ScrollView>
      <View style={styles.footerContainer}>
        <View style={styles.selectedContainer}>
          <ScalePress onPress={removeCartHandler}>
            <Icon
              name="minus-thick"
              size={RFValue(13)}
              iconFamily="MaterialCommunityIcons"
              color="#ffff"
            />
          </ScalePress>
          <AnimatedNumbers
            includeComma={false}
            animationDuration={300}
            animateToNumber={1}
            fontStyle={styles.animatedCount}
          />
          <ScalePress onPress={addCartHandler}>
            <Icon
              name="plus-thick"
              size={RFValue(13)}
              iconFamily="MaterialCommunityIcons"
              color="#ffff"
            />
          </ScalePress>
        </View>
        <TouchableOpacity
          style={styles.addButtonContainer}
          onPress={addItemIntoCart}>
          <CustomText color="#fff" fontFamily="Okra-Medium" variant="h5">
            Add item - ₹{2}
          </CustomText>
        </TouchableOpacity>
        <SafeAreaView />
      </View>
    </View>
  );
};

export default AddItemModal;
