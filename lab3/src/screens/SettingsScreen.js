import { useState } from 'react';
import { Modal, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import { useGame } from '../context/GameContext';
import AnimatedScreen from '../components/AnimatedScreen';

export default function SettingsScreen() {
  const { themeMode, toggleTheme, resetProgress } = useGame();
  const [isResetModalVisible, setIsResetModalVisible] = useState(false);

  const isDark = themeMode === 'dark';

  const openResetModal = () => {
    setIsResetModalVisible(true);
  };

  const closeResetModal = () => {
    setIsResetModalVisible(false);
  };

  const confirmResetProgress = () => {
    resetProgress();
    setIsResetModalVisible(false);
  };

  return (
    <Screen>
      <AnimatedScreen>
        <Header>
          <Title>Settings</Title>
          <Subtitle>Зміни вигляд застосунку або почни гру заново.</Subtitle>
        </Header>

        <Card>
          <SettingRow>
            <SettingInfo>
              <SettingTitle>Темна тема</SettingTitle>
              <SettingDescription>
                Увімкнути темну тему.
              </SettingDescription>
            </SettingInfo>

            <Switch value={isDark} onValueChange={toggleTheme} />
          </SettingRow>
        </Card>

        <Card>
          <SettingTitle>Скидання прогресу</SettingTitle>
          <SettingDescription>
            Натисни кнопку, щоб очистити весь прогрес.
          </SettingDescription>

          <ResetButton onPress={openResetModal}>
            <ResetButtonText>Скинути прогрес</ResetButtonText>
          </ResetButton>
        </Card>
      </AnimatedScreen>

      <Modal
        visible={isResetModalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeResetModal}
      >
        <ModalOverlay>
          <ModalCard>
            <ModalIcon>⚠️</ModalIcon>

            <ModalTitle>Скинути прогрес?</ModalTitle>

            <ModalText>
              Усі очки і виконані завдання будуть скинуті.
            </ModalText>

            <ModalButtons>
              <CancelButton onPress={closeResetModal}>
                <CancelButtonText>Скасувати</CancelButtonText>
              </CancelButton>

              <ConfirmButton onPress={confirmResetProgress}>
                <ConfirmButtonText>Скинути</ConfirmButtonText>
              </ConfirmButton>
            </ModalButtons>
          </ModalCard>
        </ModalOverlay>
      </Modal>
    </Screen>
  );
}

const Screen = styled(SafeAreaView)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  padding: 22px 18px 12px;
`;

const Header = styled.View`
  margin-bottom: 18px;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-size: 30px;
  font-weight: 900;
`;

const Subtitle = styled.Text`
  color: ${(props) => props.theme.colors.muted};
  font-size: 15px;
  margin-top: 4px;
`;

const Card = styled.View`
  background-color: ${(props) => props.theme.colors.card};
  border-radius: 20px;
  padding: 18px;
  margin-bottom: 14px;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.border};
`;

const SettingRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const SettingInfo = styled.View`
  flex: 1;
  padding-right: 14px;
`;

const SettingTitle = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-size: 17px;
  font-weight: 900;
`;

const SettingDescription = styled.Text`
  color: ${(props) => props.theme.colors.muted};
  font-size: 14px;
  line-height: 20px;
  margin-top: 6px;
`;

const ResetButton = styled.Pressable`
  margin-top: 16px;
  background-color: ${(props) => props.theme.colors.danger};
  padding: 14px;
  border-radius: 16px;
  align-items: center;
`;

const ResetButtonText = styled.Text`
  color: #ffffff;
  font-size: 15px;
  font-weight: 900;
`;

const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.55);
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

const ModalCard = styled.View`
  width: 100%;
  background-color: ${(props) => props.theme.colors.card};
  border-radius: 24px;
  padding: 22px;
  align-items: center;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.border};
`;

const ModalIcon = styled.Text`
  font-size: 36px;
  margin-bottom: 10px;
`;

const ModalTitle = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-size: 22px;
  font-weight: 900;
  text-align: center;
`;

const ModalText = styled.Text`
  color: ${(props) => props.theme.colors.muted};
  font-size: 15px;
  line-height: 22px;
  text-align: center;
  margin-top: 10px;
`;

const ModalButtons = styled.View`
  flex-direction: row;
  margin-top: 22px;
  gap: 12px;
`;

const CancelButton = styled.Pressable`
  flex: 1;
  padding: 14px;
  border-radius: 16px;
  align-items: center;
  background-color: ${(props) => props.theme.colors.surface};
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.border};
`;

const ConfirmButton = styled.Pressable`
  flex: 1;
  padding: 14px;
  border-radius: 16px;
  align-items: center;
  background-color: ${(props) => props.theme.colors.danger};
`;

const CancelButtonText = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-size: 15px;
  font-weight: 900;
`;

const ConfirmButtonText = styled.Text`
  color: #ffffff;
  font-size: 15px;
  font-weight: 900;
`;