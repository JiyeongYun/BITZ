const gameDataDummy = {
  // 체육관 정보
  gymInfo: {
    null: null
  },
  // 경기 정보
  gameInfo: {
    startTime: {
      year: 2021,
      month: 8,
      date: 2,
      hour: 17,
      minute: 15
    },
    endTime: {
      year: 2021,
      month: 8,
      date: 2,
      hour: 20,
      minute: 15
    }
  },
  // 참가자
  gameParticipants: {
    null: null
  },
  // 경기 기록
  gameData: {
    gameType: 3, // 2: 2팀, 3: 3팀
    game1_team1_score: [11, 24, 36],
    game1_team2_score: [13, 24, 35],
    game2_team1_score: [15, 17, 14],
    game2_team2_score: [16, 16, 14],
    game3_team1_score: [20, 22],
    game3_team2_score: [18, 29],
    game1_recorder: ['권오우', '박정웅', '윤지영'], // 2팀 게임은 game1만 사용
    game2_recorder: ['장현웅', '이소은', '권오우'],
    game3_recorder: ['비츠', '싸피'],
  },
}
export default gameDataDummy