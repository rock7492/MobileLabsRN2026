import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import AnimatedScreen from '../components/AnimatedScreen';
import ClickerObject from '../components/ClickerObject';
import { useGame } from '../context/GameContext';

export default function HomeScreen() {
  const { stats } = useGame();

  return (
    <Screen>
      <AnimatedScreen>
        <Scroll showsVerticalScrollIndicator={false}>
          <Header>
            <Title>Gesture Clicker</Title>
            <Subtitle>Натискай, свайпай, перетягуй об’єкт і збирай очки.</Subtitle>
          </Header>

          <ScoreCard>
            <ScoreLabel>ТВОЇ ОЧКИ</ScoreLabel>
            <ScoreValue>{stats.score}</ScoreValue>
            <LastAction>{stats.lastAction}</LastAction>
          </ScoreCard>

          <ClickerObject />

          <RulesCard>
            <RulesTitle>Жести та очки</RulesTitle>

            <RuleRow>
              <RuleIcon>👆</RuleIcon>
              <RuleText>Натисни один раз — отримай 1 очко</RuleText>
            </RuleRow>

            <RuleRow>
              <RuleIcon>✌️</RuleIcon>
              <RuleText>Натисни двічі — отримай 2 очки</RuleText>
            </RuleRow>

            <RuleRow>
              <RuleIcon>⏱️</RuleIcon>
              <RuleText>Утримуй 3 секунди — отримай 5 очок</RuleText>
            </RuleRow>

            <RuleRow>
              <RuleIcon>↔️</RuleIcon>
              <RuleText>Перетягни об’єкт — отримай 10 очок</RuleText>
            </RuleRow>

            <RuleRow>
              <RuleIcon>💨</RuleIcon>
              <RuleText>Зроби свайп — отримай випадковий бонус</RuleText>
            </RuleRow>

            <RuleRow>
              <RuleIcon>🔎</RuleIcon>
              <RuleText>Зміни розмір двома пальцями — отримай 3 очки</RuleText>
            </RuleRow>
          </RulesCard>
        </Scroll>
      </AnimatedScreen>
    </Screen>
  );
}

const Screen = styled(SafeAreaView)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

const Scroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 24,
  },
})`
  flex: 1;
`;

const Header = styled.View`
  margin-bottom: 12px;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-size: 28px;
  font-weight: 900;
`;

const Subtitle = styled.Text`
  color: ${(props) => props.theme.colors.muted};
  font-size: 14px;
  margin-top: 4px;
`;

const ScoreCard = styled.View`
  background-color: ${(props) => props.theme.colors.card};
  border-radius: 22px;
  padding: 16px;
  align-items: center;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.border};
  elevation: 3;
  shadow-color: #000000;
  shadow-opacity: 0.08;
  shadow-radius: 10px;
  shadow-offset: 0px 5px;
`;

const ScoreLabel = styled.Text`
  color: ${(props) => props.theme.colors.muted};
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 2px;
`;

const ScoreValue = styled.Text`
  color: ${(props) => props.theme.colors.primary};
  font-size: 46px;
  font-weight: 900;
  margin-top: 2px;
`;

const LastAction = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-size: 14px;
  text-align: center;
  margin-top: 2px;
`;

const RulesCard = styled.View`
  background-color: ${(props) => props.theme.colors.card};
  border-radius: 22px;
  padding: 16px;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.border};
`;

const RulesTitle = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-size: 18px;
  font-weight: 900;
  margin-bottom: 12px;
`;

const RuleRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const RuleIcon = styled.Text`
  width: 34px;
  font-size: 19px;
`;

const RuleText = styled.Text`
  flex: 1;
  color: ${(props) => props.theme.colors.text};
  font-size: 14px;
  line-height: 19px;
`;