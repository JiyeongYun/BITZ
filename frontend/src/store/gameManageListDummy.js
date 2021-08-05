const today = new Date()
const tomorrow = new Date(today.getDay(),today.getMonth(),today.getDate()+1)
const day_after_tomorrow = new Date(today.getDay(),today.getMonth(),today.getDate()+2)

const gameManageListDummy = [
  {
    id: 0,
    date: today,
    start_time: "1100",
    end_time: "1300",
    name: "역삼 싸피 체육관",
    City: "서울특별시",
    Area: "강남구",
    court_width: 15,
    court_length: 28,
    min_people: 12,
    max_people: 18,
    gameparticipant: [],
  },
  {
    id: 1,
    date: today,
    start_time: "1600",
    end_time: "1900",
    name: "역삼 싸피 체육관",
    City: "서울특별시",
    Area: "강남구",
    court_width: 15,
    court_length: 28,
    min_people: 12,
    max_people: 18,
    gameparticipant: [],
  },
  {
    id: 2,
    date: tomorrow,
    start_time: "1100",
    end_time: "1300",
    name: "역삼 싸피 체육관",
    City: "서울특별시",
    Area: "강남구",
    court_width: 15,
    court_length: 28,
    min_people: 12,
    max_people: 18,
    gameparticipant: [],
  },
  {
    id: 3,
    date: tomorrow,
    start_time: "1600",
    end_time: "1800",
    name: "역삼 싸피 체육관",
    City: "서울특별시",
    Area: "강남구",
    court_width: 15,
    court_length: 28,
    min_people: 12,
    max_people: 18,
    gameparticipant: [],
  },
  {
    id: 4,
    date: day_after_tomorrow,
    start_time: "1300",
    end_time: "1500",
    name: "역삼 싸피 체육관",
    City: "서울특별시",
    Area: "강남구",
    court_width: 15,
    court_length: 28,
    min_people: 12,
    max_people: 18,
    gameparticipant: [],
  },
  {
    id: 5,
    date: day_after_tomorrow,
    start_time: "1700",
    end_time: "2000",
    name: "역삼 싸피 체육관",
    City: "서울특별시",
    Area: "강남구",
    court_width: 15,
    court_length: 28,
    min_people: 12,
    max_people: 18,
    gameparticipant: [],
  },
]
export default gameManageListDummy