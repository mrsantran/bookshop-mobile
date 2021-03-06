import React, { useState, useEffect } from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  ActivityIndicator,
  WingBlank,
  WhiteSpace,
  Button,
} from '@ant-design/react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { RootState } from '../../store/types';
import { CUSTOMER_TOKEN } from '../../config/Constants';

export interface Props {
  onSuccess: () => {};
  onFailure: () => {};
}
const AuthLoading = ({ onSuccess, onFailure }: Props) => {
  const [token, setToken] = useState<string|null>(null);
  const tk = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    bootstrapAsync();
  }, []);

  useEffect(() => {
    if (tk) {
      onSuccess();
    }
  }, [tk]);

  const bootstrapAsync = async () => {
    const customerToken = await AsyncStorage.getItem(CUSTOMER_TOKEN);
    if (customerToken) {
      onSuccess();
    } else {
      onFailure();
    }
    setToken(customerToken);
  };

  return (
    <View style={styles.container}>
      {token ? (
        <ActivityIndicator text="loading..." size="large" animating />
      ) : (
        <WingBlank>
          <WhiteSpace />
          <Button type="primary" onPress={() => onFailure()}>
            Go to login
          </Button>
          <WhiteSpace />
        </WingBlank>
      )}
      <StatusBar barStyle="default" />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
});

export default React.memo(AuthLoading);
