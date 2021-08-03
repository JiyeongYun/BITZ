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
  gameParticipants: [
    // A팀
    {
      id: 'KOW',
      name: '권오우',
      height: 176,
      position: [
        'guard',
        'forward'
      ],
      manner: 97,
      skill: false,
      photoUrl: '',
      team: 0,
    },
    {
      id: 'PJW',
      name: '박정웅',
      height: 187,
      position: [
        'center'
      ],
      manner: 100,
      skill: 100,
      photoUrl: '',
      team: 0,
    },
    {
      id: 'YJY',
      name: '윤지영',
      height: 170,
      position: [
        'guard'
      ],
      manner: 99,
      skill: 99,
      photoUrl: '',
      team: 0,
    },
    {
      id: 'LSE',
      name: '이소은',
      height: 173,
      position: [
        'guard'
      ],
      manner: 98,
      skill: 98,
      photoUrl: '',
      team: 0,
    },
    {
      id: 'JHW',
      name: '장현웅',
      height: 184,
      position: [
        'forward'
      ],
      manner: 97,
      skill: 97,
      photoUrl: '',
      team: 0,
    },
    // B팀
    {
      id: 'KOW',
      name: '권오우',
      height: 226,
      position: [
        'guard',
        'forward',
        'center'
      ],
      manner: 97,
      skill: false,
      photoUrl: '',
      team: 1,
    },
    {
      id: 'KOW',
      name: '풀스택',
      height: 197,
      position: [
        'guard',
        'forward',
        'center'
      ],
      manner: 100,
      skill: 100,
      photoUrl: '',
      team: 1,
    },
    {
      id: 'KOW',
      name: '개발자',
      height: 199,
      position: [
        'guard',
        'forward',
        'center'
      ],
      manner: 99,
      skill: 99,
      photoUrl: '',
      team: 1,
    },
    {
      id: 'KOW',
      name: '완벽한',
      height: 213,
      position: [
        'guard',
        'forward',
        'center'
      ],
      manner: 98,
      skill: 98,
      photoUrl: '',
      team: 1,
    },
    {
      id: 'KOW',
      name: '농구인',
      height: 194,
      position: [
        'guard',
        'forward',
        'center'
      ],
      manner: 97,
      skill: 97,
      photoUrl: '',
      team: 1,
    },
    // C팀
    {
      id: 'JHW',
      name: '장현웅',
      height: 179,
      position: [
        'forward'
      ],
      manner: 97,
      skill: 97,
      photoUrl: '',
      team: 2,
    },
    {
      id: 'LSE',
      name: '이소은',
      height: 171,
      position: [
        'guard'
      ],
      manner: 98,
      skill: 98,
      photoUrl: '',
      team: 2,
    },
    {
      id: 'YJY',
      name: '윤지영',
      height: 172,
      position: [
        'guard'
      ],
      manner: 99,
      skill: 99,
      photoUrl: '',
      team: 2,
    },
    {
      id: 'PJW',
      name: '박정웅',
      height: 173,
      position: [
        'center'
      ],
      manner: 100,
      skill: 100,
      photoUrl: '',
      team: 2,
    },
    {
      id: 'KOW',
      name: '권오우',
      height: 176,
      position: [
        'guard',
        'forward'
      ],
      manner: 97,
      skill: false,
      photoUrl: '',
      team: 2,
    },
  ],
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