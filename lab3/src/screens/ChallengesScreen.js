import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import AnimatedScreen from '../components/AnimatedScreen';
import { useGame } from '../context/GameContext';
import { getChallenges } from '../data/challenges';

export default function ChallengesScreen() {
  const { stats } = useGame();
  const challenges = getChallenges(stats);

  const completedCount = challenges.filter((challenge) => challenge.done).length;

  return (
    <Screen>
      <AnimatedScreen>
        <Header>
          <Title>Challenges</Title>
          <Subtitle>
            Виконано {completedCount} з {challenges.length}
          </Subtitle>
        </Header>

        <Scroll showsVerticalScrollIndicator={false}>
          {challenges.map((challenge) => {
            const progress = Math.round((challenge.current / challenge.target) * 100);

            return (
              <ChallengeCard key={challenge.id} done={challenge.done}>
                <ChallengeTop>
                  <IconCircle done={challenge.done}>
                    <IconText>{challenge.done ? '✓' : '○'}</IconText>
                  </IconCircle>

                  <ChallengeInfo>
                    <ChallengeTitle>{challenge.title}</ChallengeTitle>
                    <ChallengeDescription>{challenge.description}</ChallengeDescription>
                  </ChallengeInfo>
                </ChallengeTop>

                <ProgressInfo>
                  <ProgressText>
                    {challenge.current}/{challenge.target}
                  </ProgressText>
                  <ProgressText>{progress}%</ProgressText>
                </ProgressInfo>

                <ProgressTrack>
                  <ProgressFill style={{ width: `${progress}%` }} done={challenge.done} />
                </ProgressTrack>
              </ChallengeCard>
            );
          })}
        </Scroll>
      </AnimatedScreen>
    </Screen>
  );
}

const Screen = styled(SafeAreaView)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  padding: 22px 18px 0;
`;

const Header = styled.View`
  margin-bottom: 16px;
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

const Scroll = styled.ScrollView`
  flex: 1;
`;

const ChallengeCard = styled.View`
  background-color: ${(props) =>
    props.done ? props.theme.colors.surface : props.theme.colors.card};
  border-radius: 20px;
  padding: 16px;
  margin-bottom: 12px;
  border-width: 1px;
  border-color: ${(props) =>
    props.done ? props.theme.colors.primary : props.theme.colors.border};
`;

const ChallengeTop = styled.View`
  flex-direction: row;
`;

const IconCircle = styled.View`
  width: 34px;
  height: 34px;
  border-radius: 17px;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  background-color: ${(props) =>
    props.done ? props.theme.colors.success : props.theme.colors.border};
`;

const IconText = styled.Text`
  color: #ffffff;
  font-size: 18px;
  font-weight: 900;
`;

const ChallengeInfo = styled.View`
  flex: 1;
`;

const ChallengeTitle = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-size: 16px;
  font-weight: 900;
`;

const ChallengeDescription = styled.Text`
  color: ${(props) => props.theme.colors.muted};
  font-size: 13px;
  line-height: 18px;
  margin-top: 4px;
`;

const ProgressInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 14px;
  margin-bottom: 6px;
`;

const ProgressText = styled.Text`
  color: ${(props) => props.theme.colors.muted};
  font-size: 12px;
  font-weight: 800;
`;

const ProgressTrack = styled.View`
  height: 8px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.border};
  overflow: hidden;
`;

const ProgressFill = styled.View`
  height: 8px;
  border-radius: 8px;
  background-color: ${(props) =>
    props.done ? props.theme.colors.success : props.theme.colors.primary};
`;