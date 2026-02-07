export interface WordPair {
  en: string;
  mm: string;
}

export interface Category {
  id: string;
  name: string;
  nameMm: string;
  icon: string;
  words: WordPair[];
}

export interface WordPair {
  en: string;
  mm: string;
  hints?: { en: string; mm: string }[];
}

// export const categories: Category[] = [
//   {
//     id: "food",
//     name: "Food",
//     nameMm: "အစားအသောက်",
//     icon: "🍔",
//     words: [
//       {
//         en: "Pizza",
//         mm: "ပီဇာ",
//         hints: [
//           { en: "Yellow", mm: "အဝါ" },
//           { en: "Cheese", mm: "ဒိန်ခဲ/ချိစ့်" },
//           { en: "Red", mm: "အနီ" },
//           { en: "Spicy", mm: "အစပ်" },
//           { en: "", mm: "ထိပ်ချွန်" },
//         ],
//       },
//       {
//         en: "Sushi",
//         mm: "ဆူရှီ",
//         hints: [
//           { en: "Fish", mm: "ငါး" },
//           { en: "Rice", mm: "ထမင်း" },
//           { en: "Soup", mm: "ဟင်းရည်" },
//         ],
//       },
//       // ... continue for other words
//     ],
//   },
//   {
//     id: "animals",
//     name: "Animals",
//     nameMm: "တိရစ္ဆာန်",
//     icon: "🐾",
//     words: [
//       {
//         en: "Dog",
//         mm: "ခွေး",
//         hints: [
//           { en: "Cat", mm: "နှာခမ်းမွှေး" },
//           { en: "Black", mm: "အမဲ" },
//           { en: "Run", mm: "ပြေး" },
//           { en: "", mm: "နှုတ်သီး" },
//           { en: "Run", mm: "ပြေး" },
//         ],
//       },
//       {
//         en: "Elephant",
//         mm: "ဆင်",
//         hints: [
//           { en: "Tiger", mm: "ကျား" },
//           { en: "Lion", mm: "ခြင်္သေ့" },
//           { en: "Horse", mm: "မြင်း" },
//         ],
//       },
//       // ... continue for other words
//     ],
//   },
//   {
//     id: "food",
//     name: "Food",
//     nameMm: "အစားအသောက်",
//     icon: "🍔",
//     words: [
//       {
//         en: "Pizza",
//         mm: "ပီဇာ",
//         hints: [
//           { en: "Burger", mm: "ဟမ်ဘာဂါ" },
//           { en: "Cheese", mm: "ဒိန်ခဲ/ချိစ့်" },
//           { en: "Bread", mm: "ပေါင်မုန့်" },
//         ],
//       },
//       {
//         en: "Sushi",
//         mm: "ဆူရှီ",
//         hints: [
//           { en: "Fish", mm: "ငါး" },
//           { en: "Rice", mm: "ထမင်း" },
//           { en: "Soup", mm: "ဟင်းရည်" },
//         ],
//       },
//       // ... continue for other words
//     ],
//   },
// ];

export const categories: Category[] = [
  {
    id: "food",
    name: "Food",
    nameMm: "အစားအသောက်",
    icon: "🍔",
    words: [
      {
        en: "Pizza",
        mm: "ပီဇာ",
        hints: [
          { en: "Yellow", mm: "အဝါရောင်" },
          { en: "Cheese", mm: "ဒိန်ခဲ/ချိစ့်" },
          { en: "Round shape", mm: "အဝိုင်းပုံစံ" },
          { en: "Oven", mm: "မီးဖို/အိုဗင်" },
          { en: "Italian", mm: "အီတလီ" },
        ],
      },
      {
        en: "Sushi",
        mm: "ဆူရှီ",
        hints: [
          { en: "Japan", mm: "ဂျပန်" },
          { en: "Raw", mm: "အစိမ်း" },
          { en: "Rice", mm: "ထမင်း" },
          { en: "Seaweed", mm: "ရေညှိ" },
          { en: "Small", mm: "သေးငယ်သော" },
        ],
      },
      {
        en: "Burger",
        mm: "ဟမ်ဘာဂါ",
        hints: [
          { en: "Bread", mm: "ပေါင်မုန့်" },
          { en: "Meat", mm: "အသား" },
          { en: "Fast food", mm: "အမြန်စာ" },
          { en: "Layered", mm: "အလွှာလိုက်" },
          { en: "Soft", mm: "ပျော့ပျောင်းသော" },
        ],
      },
      {
        en: "Rice",
        mm: "ထမင်း",
        hints: [
          { en: "White", mm: "အဖြူရောင်" },
          { en: "Main food", mm: "အဓိကအစားအစာ" },
          { en: "Grains", mm: "အစေ့အဆန်" },
          { en: "Asia", mm: "အာရှ" },
          { en: "Soft", mm: "ပျော့ပျောင်းသော" },
        ],
      },
      {
        en: "Noodles",
        mm: "ခေါက်ဆွဲ",
        hints: [
          { en: "Long", mm: "အရှည်" },
          { en: "Yellow", mm: "အဝါရောင်" },
          { en: "Soup", mm: "ဟင်းရည်" },
          { en: "Chopsticks", mm: "တူ" },
          { en: "Soft", mm: "ပျော့ပျောင်းသော" },
        ],
      },
      {
        en: "Cake",
        mm: "ကိတ်မုန့်",
        hints: [
          { en: "Sweet", mm: "အချို" },
          { en: "Birthday", mm: "မွေးနေ့" },
          { en: "Cream", mm: "ခရင်မ်" },
          { en: "Soft", mm: "နူးညံ့သော" },
          { en: "Oven", mm: "မီးဖို/အိုဗင်" },
        ],
      },
      {
        en: "Ice Cream",
        mm: "ရေခဲမုန့်",
        hints: [
          { en: "Cold", mm: "အေးသော" },
          { en: "Sweet", mm: "အချို" },
          { en: "Melts", mm: "အရည်ပျော်သော" },
          { en: "Summer", mm: "နွေရာသီ" },
          { en: "Milk", mm: "နို့" },
        ],
      },
      {
        en: "Chicken",
        mm: "ကြက်သား",
        hints: [
          { en: "Meat", mm: "အသား" },
          { en: "Bird", mm: "ငှက်" },
          { en: "Fried", mm: "အကြော်" },
          { en: "Protein", mm: "ပရိုတင်း" },
          { en: "Wings", mm: "အတောင်ပံ" },
        ],
      },
      {
        en: "Fish",
        mm: "ငါး",
        hints: [
          { en: "Water", mm: "ရေ" },
          { en: "Meat", mm: "အသား" },
          { en: "Bones", mm: "အရိုး" },
          { en: "Healthy", mm: "ကျန်းမာရေးနှင့်ညီညွတ်သော" },
          { en: "Smell", mm: "အနံ့" },
        ],
      },
      {
        en: "Bread",
        mm: "ပေါင်မုန့်",
        hints: [
          { en: "Flour", mm: "ဂျုံမှုန့်" },
          { en: "Morning", mm: "မနက်ခင်း" },
          { en: "Soft", mm: "နူးညံ့သော" },
          { en: "Toast", mm: "ကင်ထားသော" },
          { en: "Bakery", mm: "မုန့်တိုက်" },
        ],
      },
      {
        en: "Salad",
        mm: "အသုပ်",
        hints: [
          { en: "Vegetables", mm: "ဟင်းသီးဟင်းရွက်" },
          { en: "Green", mm: "အစိမ်းရောင်" },
          { en: "Healthy", mm: "ကျန်းမာရေးနှင့်ညီညွတ်သော" },
          { en: "Fresh", mm: "လတ်ဆတ်သော" },
          { en: "Mixed", mm: "ရောနှောထားသော" },
        ],
      },
      {
        en: "Soup",
        mm: "ဟင်းရည်",
        hints: [
          { en: "Liquid", mm: "အရည်" },
          { en: "Hot", mm: "ပူသော" },
          { en: "Bowl", mm: "ပန်းကန်လုံး" },
          { en: "Spoon", mm: "ဇွန်း" },
          { en: "Healthy", mm: "ကျန်းမာရေးနှင့်ညီညွတ်သော" },
        ],
      },
      {
        en: "Egg",
        mm: "ကြက်ဥ",
        hints: [
          { en: "Oval", mm: "ဥပုံစံ" },
          { en: "White", mm: "အဖြူ" },
          { en: "Yellow", mm: "အဝါ" },
          { en: "Breakfast", mm: "မနက်စာ" },
          { en: "Shell", mm: "အခွံ" },
        ],
      },
      {
        en: "Cheese",
        mm: "ဒိန်ခဲ/ချိစ့်",
        hints: [
          { en: "Yellow", mm: "အဝါရောင်" },
          { en: "Milk", mm: "နို့" },
          { en: "Pizza", mm: "ပီဇာ" },
          { en: "Salty", mm: "အငန်" },
          { en: "Melts", mm: "အရည်ပျော်သော" },
        ],
      },
      {
        en: "Fried-Rice",
        mm: "ထမင်းကြော်",
        hints: [
          { en: "Oil", mm: "ဆီ" },
          { en: "Morning", mm: "မနက်ခင်း" },
          { en: "Pan", mm: "ဒယ်အိုး" },
          { en: "Mix", mm: "ရောနှောခြင်း" },
          { en: "Rice", mm: "ထမင်း" },
        ],
      },
    ],
  },
  {
    id: "animals",
    name: "Animals",
    nameMm: "တိရစ္ဆာန်",
    icon: "🐾",
    words: [
      {
        en: "Dolphin",
        mm: "လင်းပိုင်",
        hints: [
          { en: "Water", mm: "ရေ" },
          { en: "Smart", mm: "ဉာဏ်ကောင်းသော" },
          { en: "Jump", mm: "ခုန်ခြင်း" },
          { en: "Sea", mm: "ပင်လယ်" },
          { en: "Friendly", mm: "ဖော်ရွေသော" },
        ],
      },
      {
        en: "Elephant",
        mm: "ဆင်",
        hints: [
          { en: "Big", mm: "ကြီးမားသော" },
          { en: "Grey", mm: "မီးခိုးရောင်" },
          { en: "Trunk", mm: "နှာမောင်း" },
          { en: "Strong", mm: "သန်မာသော" },
          { en: "Forest", mm: "တောအုပ်" },
        ],
      },
      {
        en: "Tiger",
        mm: "ကျား",
        hints: [
          { en: "Orange", mm: "လိမ္မော်ရောင်" },
          { en: "Stripes", mm: "အစင်းကြောင်းများ" },
          { en: "Wild", mm: "တောရိုင်း" },
          { en: "Cat family", mm: "ကြောင်မျိုးရင်း" },
          { en: "Hunter", mm: "အမဲလိုက်သတ္တဝါ" },
        ],
      },
      {
        en: "Eagle",
        mm: "လင်းယုန်",
        hints: [
          { en: "Sky", mm: "ကောင်းကင်" },
          { en: "Fly", mm: "ပျံသန်းခြင်း" },
          { en: "Sharp eyes", mm: "စူးရှသောမျက်လုံး" },
          { en: "Wings", mm: "အတောင်ပံ" },
          { en: "Bird", mm: "ငှက်" },
        ],
      },
      {
        en: "Penguin",
        mm: "ပင်ဂွင်း",
        hints: [
          { en: "Cold", mm: "အေးသော" },
          { en: "Ice", mm: "ရေခဲ" },
          { en: "Black and White", mm: "အဖြူအမည်း" },
          { en: "Cannot fly", mm: "မပျံသန်းနိုင်" },
          { en: "Swim", mm: "ရေကူးခြင်း" },
        ],
      },
      {
        en: "Panda",
        mm: "ပန်ဒါ",
        hints: [
          { en: "Black and White", mm: "အဖြူအမည်း" },
          { en: "Bamboo", mm: "ဝါး" },
          { en: "China", mm: "တရုတ်" },
          { en: "Lazy", mm: "ပျင်းရိသော" },
          { en: "Bear", mm: "ဝက်ဝံ" },
        ],
      },
      {
        en: "Lion",
        mm: "ခြင်္သေ့",
        hints: [
          { en: "King", mm: "ဘုရင်" },
          { en: "Wild", mm: "တောရိုင်း" },
          { en: "Strong", mm: "သန်မာသော" },
          { en: "Golden", mm: "ရွှေရောင်" },
          { en: "Roar", mm: "ဟိန်းသံ" },
        ],
      },
      {
        en: "Snake",
        mm: "မြွေ",
        hints: [
          { en: "Long", mm: "အရှည်" },
          { en: "No legs", mm: "ခြေထောက်မပါ" },
          { en: "Poison", mm: "အဆိပ်" },
          { en: "Skin", mm: "အရေပြား" },
          { en: "Scary", mm: "ကြောက်စရာကောင်းသော" },
        ],
      },
      {
        en: "Monkey",
        mm: "မျောက်",
        hints: [
          { en: "Tree", mm: "သစ်ပင်" },
          { en: "Banana", mm: "ငှက်ပျောသီး" },
          { en: "Climb", mm: "တက်ခြင်း" },
          { en: "Funny", mm: "ရယ်စရာကောင်းသော" },
          { en: "Tail", mm: "အမြီး" },
        ],
      },
      {
        en: "Cat",
        mm: "ကြောင်",
        hints: [
          { en: "Pet", mm: "အိမ်မွေးတိရစ္ဆာန်" },
          { en: "Small", mm: "သေးငယ်သော" },
          { en: "Soft", mm: "နူးညံ့သော" },
          { en: "Meow", mm: "အော်သံ (မြောင်)" },
          { en: "Cute", mm: "ချစ်စရာကောင်းသော" },
        ],
      },
      {
        en: "Dog",
        mm: "ခွေး",
        hints: [
          { en: "Pet", mm: "အိမ်မွေးတိရစ္ဆာန်" },
          { en: "Loyal", mm: "သစ္စာရှိသော" },
          { en: "Bark", mm: "ဟောင်ခြင်း" },
          { en: "Friend", mm: "သူငယ်ချင်း" },
          { en: "Guard", mm: "စောင့်ရှောက်သူ" },
        ],
      },
      {
        en: "Horse",
        mm: "မြင်း",
        hints: [
          { en: "Run", mm: "ပြေးခြင်း" },
          { en: "Fast", mm: "မြန်သော" },
          { en: "Ride", mm: "စီးနင်းခြင်း" },
          { en: "Strong", mm: "သန်မာသော" },
          { en: "Farm", mm: "ခြံ" },
        ],
      },
      {
        en: "Rabbit",
        mm: "ယုန်",
        hints: [
          { en: "Long ears", mm: "နားရွက်ရှည်" },
          { en: "Carrot", mm: "မုန်လာဥနီ" },
          { en: "Jump", mm: "ခုန်ခြင်း" },
          { en: "Soft", mm: "နူးညံ့သော" },
          { en: "White", mm: "အဖြူရောင်" },
        ],
      },
      {
        en: "Butterfly",
        mm: "လိပ်ပြာ",
        hints: [
          { en: "Small", mm: "သေးငယ်သော" },
          { en: "Beautiful", mm: "လှပသော" },
          { en: "Colors", mm: "အရောင်စုံ" },
          { en: "Wings", mm: "အတောင်ပံ" },
          { en: "Flower", mm: "ပန်းပွင့်" },
        ],
      },
      {
        en: "Whale",
        mm: "ဝေလငါး",
        hints: [
          { en: "Biggest", mm: "အကြီးဆုံး" },
          { en: "Ocean", mm: "သမုဒ္ဒရာ" },
          { en: "Water", mm: "ရေ" },
          { en: "Heavy", mm: "လေးလံသော" },
          { en: "Blue", mm: "အပြာရောင်" },
        ],
      },
    ],
  },
  {
    id: "things",
    name: "Things",
    nameMm: "အရာဝတ္ထု",
    icon: "📦",
    words: [
      {
        en: "Phone",
        mm: "ဖုန်း",
        hints: [
          { en: "Communication", mm: "ဆက်သွယ်ရေး" },
          { en: "Pocket", mm: "အိတ်ကပ်" },
          { en: "Screen", mm: "မျက်နှာပြင်" },
          { en: "Call", mm: "ဖုန်းခေါ်ခြင်း" },
          { en: "Internet", mm: "အင်တာနက်" },
        ],
      },
      {
        en: "Computer",
        mm: "ကွန်ပျူတာ",
        hints: [
          { en: "Work", mm: "အလုပ်" },
          { en: "Keyboard", mm: "ကီးဘုတ်" },
          { en: "Desk", mm: "စားပွဲ" },
          { en: "Software", mm: "ဆော့ဖ်ဝဲလ်" },
          { en: "Screen", mm: "မျက်နှာပြင်" },
        ],
      },
      {
        en: "Book",
        mm: "စာအုပ်",
        hints: [
          { en: "Read", mm: "ဖတ်ခြင်း" },
          { en: "Paper", mm: "စက္ကူ" },
          { en: "Knowledge", mm: "ဗဟုသုတ" },
          { en: "Library", mm: "စာကြည့်တိုက်" },
          { en: "Pages", mm: "စာမျက်နှာများ" },
        ],
      },
      {
        en: "Watch",
        mm: "နာရီ",
        hints: [
          { en: "Time", mm: "အချိန်" },
          { en: "Wrist", mm: "လက်ကောက်ဝတ်" },
          { en: "Numbers", mm: "ဂဏန်းများ" },
          { en: "Circle", mm: "အဝိုင်း" },
          { en: "Small", mm: "သေးငယ်သော" },
        ],
      },
      {
        en: "Camera",
        mm: "ကင်မရာ",
        hints: [
          { en: "Photo", mm: "ဓာတ်ပုံ" },
          { en: "Memory", mm: "အမှတ်တရ" },
          { en: "Flash", mm: "မီးရောင်" },
          { en: "Lens", mm: "မှန်ဘီလူး" },
          { en: "Smile", mm: "အပြုံး" },
        ],
      },
      {
        en: "Mirror",
        mm: "မှန်",
        hints: [
          { en: "Reflection", mm: "ပုံရိပ်" },
          { en: "Glass", mm: "ဖန်" },
          { en: "Face", mm: "မျက်နှာ" },
          { en: "Bathroom", mm: "ရေချိုးခန်း" },
          { en: "Selfie", mm: "မိမိကိုယ်ကိုကြည့်ခြင်း" },
        ],
      },
      {
        en: "Umbrella",
        mm: "ထီး",
        hints: [
          { en: "Rain", mm: "မိုး" },
          { en: "Sun", mm: "နေရောင်" },
          { en: "Protection", mm: "ကာကွယ်မှု" },
          { en: "Open/Close", mm: "အဖွင့်အပိတ်" },
          { en: "Handle", mm: "လက်ကိုင်" },
        ],
      },
      {
        en: "Guitar",
        mm: "ဂစ်တာ",
        hints: [
          { en: "Music", mm: "ဂီတ" },
          { en: "Strings", mm: "ကြိုးများ" },
          { en: "Wood", mm: "သစ်သား" },
          { en: "Play", mm: "တီးခတ်ခြင်း" },
          { en: "Sound", mm: "အသံ" },
        ],
      },
      {
        en: "Bicycle",
        mm: "စက်ဘီး",
        hints: [
          { en: "Wheels", mm: "ဘီးများ" },
          { en: "Ride", mm: "စီးနင်းခြင်း" },
          { en: "Exercise", mm: "လေ့ကျင့်ခန်း" },
          { en: "Two-wheels", mm: "ဘီးနှစ်ဘီး" },
          { en: "Pedal", mm: "ခြေနင်း" },
        ],
      },
      {
        en: "Lamp",
        mm: "မီးအိမ်",
        hints: [
          { en: "Light", mm: "အလင်းရောင်" },
          { en: "Night", mm: "ည" },
          { en: "Electricity", mm: "လျှပ်စစ်" },
          { en: "Bright", mm: "လင်းထိန်သော" },
          { en: "Table", mm: "စားပွဲ" },
        ],
      },
      {
        en: "Scissors",
        mm: "ကတ်ကြေး",
        hints: [
          { en: "Cut", mm: "ဖြတ်ခြင်း" },
          { en: "Sharp", mm: "ထက်သော" },
          { en: "Paper", mm: "စက္ကူ" },
          { en: "Two-blades", mm: "ဓားသွားနှစ်ခု" },
          { en: "Hand", mm: "လက်" },
        ],
      },
      {
        en: "Pillow",
        mm: "ခေါင်းအုံး",
        hints: [
          { en: "Sleep", mm: "အိပ်စက်ခြင်း" },
          { en: "Soft", mm: "နူးညံ့သော" },
          { en: "Bed", mm: "ခုတင်" },
          { en: "Head", mm: "ခေါင်း" },
          { en: "Night", mm: "ည" },
        ],
      },
      {
        en: "Balloon",
        mm: "ပူဖောင်း",
        hints: [
          { en: "Air", mm: "လေ" },
          { en: "Party", mm: "ပွဲလမ်းသဘင်" },
          { en: "Colorful", mm: "အရောင်စုံ" },
          { en: "Fly", mm: "ပျံတက်ခြင်း" },
          { en: "Round", mm: "အဝိုင်း" },
        ],
      },
      {
        en: "Key",
        mm: "သော့",
        hints: [
          { en: "Lock", mm: "သော့ခတ်ခြင်း" },
          { en: "Door", mm: "တံခါး" },
          { en: "Metal", mm: "သတ္တု" },
          { en: "Small", mm: "သေးငယ်သော" },
          { en: "Pocket", mm: "အိတ်ကပ်" },
        ],
      },
      {
        en: "Crown",
        mm: "သရဖူ",
        hints: [
          { en: "King/Queen", mm: "ဘုရင်/မိဖုရား" },
          { en: "Gold", mm: "ရွှေ" },
          { en: "Head", mm: "ခေါင်း" },
          { en: "Expensive", mm: "စျေးကြီးသော" },
          { en: "Power", mm: "အာဏာ" },
        ],
      },
    ],
  },
  {
    id: "sports",
    name: "Sports",
    nameMm: "အားကစား",
    icon: "⚽",
    words: [
      {
        en: "Football",
        mm: "ဘောလုံး",
        hints: [
          { en: "Kick", mm: "ကန်ခြင်း" },
          { en: "Goal", mm: "ဂိုး" },
          { en: "Grass", mm: "မြက်ခင်း" },
          { en: "Team", mm: "အသင်း" },
          { en: "Shoes", mm: "ဖိနပ်" },
        ],
      },
      {
        en: "Basketball",
        mm: "ဘတ်စကက်ဘော",
        hints: [
          { en: "Ball", mm: "ဘောလုံး" },
          { en: "Hands", mm: "လက်များ" },
          { en: "Tall", mm: "အရပ်ရှည်သော" },
          { en: "Basket", mm: "ခြင်းတောင်း" },
          { en: "Jump", mm: "ခုန်ခြင်း" },
        ],
      },
      {
        en: "Tennis",
        mm: "တင်းနစ်",
        hints: [
          { en: "Racket", mm: "ရက်ကတ်" },
          { en: "Yellow ball", mm: "အဝါရောင်ဘောလုံး" },
          { en: "Net", mm: "ပိုက်" },
          { en: "Court", mm: "ကွင်း" },
          { en: "Hit", mm: "ရိုက်ခြင်း" },
        ],
      },
      {
        en: "Swimming",
        mm: "ရေကူး",
        hints: [
          { en: "Water", mm: "ရေ" },
          { en: "Pool", mm: "ရေကူးကန်" },
          { en: "Goggles", mm: "မျက်မှန်" },
          { en: "Breath", mm: "အသက်ရှူခြင်း" },
          { en: "Wet", mm: "စိုစွတ်သော" },
        ],
      },
      {
        en: "Boxing",
        mm: "လက်ဝှေ့",
        hints: [
          { en: "Gloves", mm: "လက်အိတ်" },
          { en: "Punch", mm: "ထိုးခြင်း" },
          { en: "Ring", mm: "စင်" },
          { en: "Fight", mm: "တိုက်ခိုက်ခြင်း" },
          { en: "Strong", mm: "သန်မာသော" },
        ],
      },
      {
        en: "Cricket",
        mm: "ခရစ်ကက်",
        hints: [
          { en: "Bat", mm: "ရိုက်တံ" },
          { en: "Ball", mm: "ဘောလုံး" },
          { en: "Run", mm: "ပြေးခြင်း" },
          { en: "White clothes", mm: "အဖြူရောင်ဝတ်စုံ" },
          { en: "Field", mm: "ကွင်း" },
        ],
      },
      {
        en: "Volleyball",
        mm: "ဘော်လီဘော",
        hints: [
          { en: "Net", mm: "ပိုက်" },
          { en: "Hands", mm: "လက်များ" },
          { en: "Hit", mm: "ရိုက်ခြင်း" },
          { en: "Jump", mm: "ခုန်ခြင်း" },
          { en: "Team", mm: "အသင်း" },
        ],
      },
      {
        en: "Golf",
        mm: "ဂေါက်ရိုက်",
        hints: [
          { en: "Club", mm: "ရိုက်တံ" },
          { en: "Small ball", mm: "ဘောလုံးလေး" },
          { en: "Hole", mm: "ကျင်း" },
          { en: "Expensive", mm: "စျေးကြီးသော" },
          { en: "Green", mm: "မြက်ခင်းပြင်" },
        ],
      },
      {
        en: "Badminton",
        mm: "ကြက်တောင်",
        hints: [
          { en: "Racket", mm: "ရက်ကတ်" },
          { en: "Shuttlecock", mm: "ကြက်တောင်" },
          { en: "Net", mm: "ပိုက်" },
          { en: "Fly", mm: "ပျံသန်းခြင်း" },
          { en: "Indoor", mm: "မိုးလုံလေလုံ" },
        ],
      },
      {
        en: "Karate",
        mm: "ကရာတေး (သိုင်းလိုမျိုးချတာ)",
        hints: [
          { en: "Belt", mm: "ခါးပတ်" },
          { en: "Kick", mm: "ကန်ခြင်း" },
          { en: "White suit", mm: "အဖြူရောင်ဝတ်စုံ" },
          { en: "Defense", mm: "ကာကွယ်ခြင်း" },
          { en: "Japan", mm: "ဂျပန်" },
        ],
      },
      {
        en: "Cycling",
        mm: "စက်ဘီးစီး",
        hints: [
          { en: "Wheels", mm: "ဘီးများ" },
          { en: "Road", mm: "လမ်း" },
          { en: "Helmet", mm: "ဦးထုပ်" },
          { en: "Legs", mm: "ခြေထောက်များ" },
          { en: "Fast", mm: "မြန်သော" },
        ],
      },
      {
        en: "Archery",
        mm: "မြှားပစ်",
        hints: [
          { en: "Arrow", mm: "မြှား" },
          { en: "Bow", mm: "လေး" },
          { en: "Target", mm: "ပစ်မှတ်" },
          { en: "Eyes", mm: "မျက်လုံး" },
          { en: "Focus", mm: "အာရုံစိုက်ခြင်း" },
        ],
      },
      {
        en: "Wrestling",
        mm: "နပန်း",
        hints: [
          { en: "Fight", mm: "တိုက်ခိုက်ခြင်း" },
          { en: "Two people", mm: "နှစ်ယောက်" },
          { en: "Strong", mm: "သန်မာသော" },
          { en: "Floor", mm: "ကြမ်းပြင်" },
          { en: "Hold", mm: "ချုပ်ကိုင်ခြင်း" },
        ],
      },
    ],
  },
  {
    id: "technology",
    name: "Technology",
    nameMm: "နည်းပညာ",
    icon: "💻",
    words: [
      {
        en: "Robot",
        mm: "စက်ရုပ်",
        hints: [
          { en: "Machine", mm: "စက်ပစ္စည်း" },
          { en: "Automatic", mm: "အလိုအလျောက်" },
          { en: "Future", mm: "အနာဂတ်" },
          { en: "Metal", mm: "သတ္တု" },
          { en: "Made in USA", mm: "အမေရိကန်မှာလုပ်သည်" },
        ],
      },
      {
        en: "Internet",
        mm: "အင်တာနက်",
        hints: [
          { en: "Global", mm: "တစ်ကမ္ဘာလုံးဆိုင်ရာ" },
          { en: "Connection", mm: "ချိတ်ဆက်မှု" },
          { en: "Data", mm: "ဒေတာ" },
          { en: "Invisible", mm: "မမြင်ရသော" },
          { en: "Search", mm: "ရှာဖွေခြင်း" },
        ],
      },
      {
        en: "Satellite",
        mm: "ဂြိုလ်တု",
        hints: [
          { en: "Space", mm: "အာကာသ" },
          { en: "Earth", mm: "ကမ္ဘာမြေ" },
          { en: "Signal", mm: "လှိုင်း/အချက်ပြ" },
          { en: "High", mm: "မြင့်မားသော" },
          { en: "Communication", mm: "ဆက်သွယ်ရေး" },
        ],
      },
      {
        en: "Drone",
        mm: "ဒရုန်း",
        hints: [
          { en: "Fly", mm: "ပျံသန်းခြင်း" },
          { en: "Camera", mm: "ကင်မရာ" },
          { en: "Remote control", mm: "အဝေးထိန်း" },
          { en: "Sky", mm: "ကောင်းကင်" },
          { en: "Propellers", mm: "ပန်ကာများ" },
        ],
      },
      {
        en: "WiFi",
        mm: "ဝိုင်ဖိုင်",
        hints: [
          { en: "Wireless", mm: "ကြိုးမဲ့" },
          { en: "Internet", mm: "အင်တာနက်" },
          { en: "Password", mm: "လျှို့ဝှက်နံပါတ်" },
          { en: "Signal", mm: "လှိုင်း" },
          { en: "Home/Office", mm: "အိမ် သို့မဟုတ် ရုံး" },
        ],
      },
      {
        en: "Laptop",
        mm: "လက်ပ်တော့",
        hints: [
          { en: "Portable", mm: "သယ်ဆောင်ရလွယ်သော" },
          { en: "Keyboard", mm: "ကီးဘုတ်" },
          { en: "Screen", mm: "မျက်နှာပြင်" },
          { en: "Battery", mm: "ဘက်ထရီ" },
          { en: "Foldable", mm: "ခေါက်နိုင်သော" },
        ],
      },
      {
        en: "Tablet",
        mm: "တက်ဘလက်",
        hints: [
          { en: "Screen", mm: "မျက်နှာပြင်" },
          { en: "Touch", mm: "ထိတွေ့မှု" },
          { en: "Portable", mm: "သယ်ဆောင်ရလွယ်သော" },
          { en: "No keyboard", mm: "ကီးဘုတ်မပါ" },
          { en: "Draw/Watch", mm: "ဆွဲခြင်း သို့မဟုတ် ကြည့်ခြင်း" },
        ],
      },
      {
        en: "Speaker",
        mm: "စပီကာ",
        hints: [
          { en: "Sound", mm: "အသံ" },
          { en: "Music", mm: "ဂီတ" },
          { en: "Loud", mm: "ကျယ်လောင်သော" },
          { en: "Bluetooth", mm: "ဘလူးတုသ်" },
          { en: "Box", mm: "သေတ္တာပုံစံ" },
        ],
      },
      {
        en: "Keyboard",
        mm: "ကီးဘုတ်",
        hints: [
          { en: "Type", mm: "စာရိုက်ခြင်း" },
          { en: "Buttons", mm: "ခလုတ်များ" },
          { en: "Computer", mm: "ကွန်ပျူတာ" },
          { en: "Letters", mm: "စာလုံးများ" },
          { en: "Hands", mm: "လက်များ" },
        ],
      },
      {
        en: "Headphone",
        mm: "နားကြပ်",
        hints: [
          { en: "Ears", mm: "နား" },
          { en: "Private", mm: "သီးသန့်" },
          { en: "Sound", mm: "အသံ" },
          { en: "Listen", mm: "နားထောင်ခြင်း" },
          { en: "Wire/Wireless", mm: "ကြိုးပါ သို့မဟုတ် ကြိုးမဲ့" },
        ],
      },
      {
        en: "Charger",
        mm: "အားသွင်းခေါင်း",
        hints: [
          { en: "Power", mm: "စွမ်းအင်" },
          { en: "Battery", mm: "ဘက်ထရီ" },
          { en: "Electricity", mm: "လျှပ်စစ်" },
          { en: "Wire", mm: "ကြိုး" },
          { en: "Plug", mm: "ပလပ်ပေါက်" },
        ],
      },
    ],
  },
  {
    id: "music",
    name: "Music",
    nameMm: "ဂီတ",
    icon: "🎵",
    words: [
      {
        en: "Piano",
        mm: "စန္ဒယား",
        hints: [
          { en: "Black and White", mm: "အမည်းနှင့် အဖြူ" },
          { en: "Keys", mm: "ခလုတ်များ" },
          { en: "Big", mm: "ကြီးမားသော" },
          { en: "Elegant", mm: "ခန့်ညားသော" },
          { en: "Fingers", mm: "လက်ချောင်းများ" },
        ],
      },
      {
        en: "Violin",
        mm: "တယော",
        hints: [
          { en: "Strings", mm: "ကြိုးများ" },
          { en: "Shoulder", mm: "ပုခုံး" },
          { en: "Stick", mm: "တံ" },
          { en: "Sad or Sweet", mm: "အလွမ်း သို့မဟုတ် အချို" },
          { en: "Wood", mm: "သစ်သား" },
        ],
      },
      {
        en: "Drums",
        mm: "ဗုံ",
        hints: [
          { en: "Beat", mm: "စည်းချက်" },
          { en: "Hit", mm: "ရိုက်ခြင်း" },
          { en: "Loud", mm: "ကျယ်လောင်သော" },
          { en: "Sticks", mm: "တုတ်ချောင်းများ" },
          { en: "Rock music", mm: "ရောခ့်ဂီတ" },
        ],
      },
      {
        en: "Flute",
        mm: "ပလွေ",
        hints: [
          { en: "Blow", mm: "မှုတ်ခြင်း" },
          { en: "Air", mm: "လေ" },
          { en: "Holes", mm: "အပေါက်များ" },
          { en: "Long", mm: "အရှည်" },
          { en: "Wood or Metal", mm: "သစ်သား သို့မဟုတ် သတ္တု" },
        ],
      },
      {
        en: "Harp",
        mm: "စောင်း",
        hints: [
          { en: "Strings", mm: "ကြိုးများ" },
          { en: "Ancient", mm: "ရှေးကျသော" },
          { en: "Pluck", mm: "တီးခတ်ခြင်း/ခါခြင်း" },
          { en: "Beautiful shape", mm: "လှပသောပုံစံ" },
          { en: "Heavenly", mm: "နတ်သံသာကဲ့သို့" },
        ],
      },
      {
        en: "Microphone",
        mm: "မိုက်ခရိုဖုန်း",
        hints: [
          { en: "Sing", mm: "သီချင်းဆိုခြင်း" },
          { en: "Loud voice", mm: "ကျယ်လောင်သောအသံ" },
          { en: "Stage", mm: "စင်မြင့်" },
          { en: "Hold", mm: "ကိုင်ထားခြင်း" },
          { en: "Speaker", mm: "စပီကာ" },
        ],
      },
      {
        en: "Concert",
        mm: "ဂီတဖျော်ဖြေပွဲ",
        hints: [
          { en: "Crowd", mm: "လူအုပ်ကြီး" },
          { en: "Tickets", mm: "လက်မှတ်များ" },
          { en: "Live", mm: "တိုက်ရိုက်" },
          { en: "Stage", mm: "စင်မြင့်" },
          { en: "Lights", mm: "မီးရောင်များ" },
        ],
      },
      {
        en: "Album",
        mm: "အယ်လ်ဘမ်",
        hints: [
          { en: "Songs", mm: "သီချင်းများ" },
          { en: "Collection", mm: "စုစည်းမှု" },
          { en: "Artist", mm: "အနုပညာရှင်" },
          { en: "Cover", mm: "မျက်နှာဖုံး" },
          { en: "Record", mm: "ဓာတ်ပြား/မှတ်တမ်း" },
        ],
      },
      {
        en: "Choir",
        mm: "သီချင်းအဖွဲ့",
        hints: [
          { en: "Group", mm: "အဖွဲ့လိုက်" },
          { en: "Voices", mm: "အသံများ" },
          { en: "Church", mm: "ဘုရားကျောင်း" },
          { en: "Harmony", mm: "သံစဉ်ညီညွတ်မှု" },
          { en: "Together", mm: "အတူတကွ" },
        ],
      },
      {
        en: "DJ",
        mm: "ဒီဂျေ",
        hints: [
          { en: "Party", mm: "ပါတီ" },
          { en: "Mix", mm: "ရောနှောခြင်း" },
          { en: "Headphones", mm: "နားကြပ်" },
          { en: "Club", mm: "ကလပ်" },
          { en: "Night", mm: "ည" },
        ],
      },
      {
        en: "Guitar",
        mm: "ဂစ်တာ",
        hints: [
          { en: "Strings", mm: "ကြိုးများ" },
          { en: "Six", mm: "ခြောက်ခု" },
          { en: "Fingers", mm: "လက်ချောင်းများ" },
          { en: "Wood", mm: "သစ်သား" },
          { en: "Strum", mm: "ခတ်ခြင်း" },
        ],
      },
    ],
  },

  {
    id: "jobs",
    name: "Jobs",
    nameMm: "အလုပ်အကိုင်",
    icon: "💼",
    words: [
      {
        en: "Doctor",
        mm: "ဆရာဝန်",
        hints: [
          { en: "Hospital", mm: "ဆေးရုံ" },
          { en: "Medicine", mm: "ဆေးဝါး" },
          { en: "Help", mm: "ကူညီခြင်း" },
          { en: "White coat", mm: "အင်္ကျီအဖြူ" },
          { en: "Sick", mm: "ဖျားနာခြင်း" },
        ],
      },
      {
        en: "Teacher",
        mm: "ဆရာ",
        hints: [
          { en: "School", mm: "ကျောင်း" },
          { en: "Students", mm: "ကျောင်းသားများ" },
          { en: "Book", mm: "စာအုပ်" },
          { en: "Lesson", mm: "သင်ခန်းစာ" },
          { en: "Knowledge", mm: "ဗဟုသုတ" },
        ],
      },
      {
        en: "Engineer",
        mm: "အင်ဂျင်နီယာ",
        hints: [
          { en: "Build", mm: "တည်ဆောက်ခြင်း" },
          { en: "Math", mm: "သင်္ချာ" },
          { en: "Plan", mm: "အစီအစဉ်/ပုံစံထုတ်ခြင်း" },
          { en: "Machine", mm: "စက်ပစ္စည်း" },
          { en: "Hard hat", mm: "ဦးထုပ်မာ" },
        ],
      },
      {
        en: "Pilot",
        mm: "လေယာဉ်မှူး",
        hints: [
          { en: "Sky", mm: "ကောင်းကင်" },
          { en: "Fly", mm: "ပျံသန်းခြင်း" },
          { en: "Travel", mm: "ခရီးသွားခြင်း" },
          { en: "Plane", mm: "လေယာဉ်" },
          { en: "Airport", mm: "လေဆိပ်" },
        ],
      },
      {
        en: "Chef",
        mm: "စားဖိုမှူး",
        hints: [
          { en: "Food", mm: "အစားအသောက်" },
          { en: "Kitchen", mm: "မီးဖိုချောင်" },
          { en: "Cook", mm: "ချက်ပြုတ်ခြင်း" },
          { en: "Restaurant", mm: "စားသောက်ဆိုင်" },
          { en: "Knife", mm: "ဓား" },
        ],
      },
      {
        en: "Lawyer",
        mm: "ရှေ့နေ",
        hints: [
          { en: "Court", mm: "တရားရုံး" },
          { en: "Law", mm: "ဥပဒေ" },
          { en: "Speak", mm: "စကားပြောခြင်း" },
          { en: "Truth", mm: "အမှန်တရား" },
          { en: "Black suit", mm: "ဝတ်စုံအမည်း" },
        ],
      },
      {
        en: "Farmer",
        mm: "လယ်သမား",
        hints: [
          { en: "Field", mm: "လယ်ကွင်း" },
          { en: "Plant", mm: "စိုက်ပျိုးခြင်း" },
          { en: "Rice", mm: "ဆန်/စပါး" },
          { en: "Sun", mm: "နေရောင်" },
          { en: "Hard work", mm: "ပင်ပန်းသောအလုပ်" },
        ],
      },
      {
        en: "Nurse",
        mm: "သူနာပြု",
        hints: [
          { en: "Care", mm: "ပြုစုခြင်း" },
          { en: "Hospital", mm: "ဆေးရုံ" },
          { en: "Injection", mm: "ဆေးထိုးခြင်း" },
          { en: "Patient", mm: "လူနာ" },
          { en: "Kind", mm: "ကြင်နာသော" },
        ],
      },
      {
        en: "Artist",
        mm: "အနုပညာရှင်",
        hints: [
          { en: "Paint", mm: "ဆေးသုတ်/ရေးဆွဲခြင်း" },
          { en: "Color", mm: "အရောင်" },
          { en: "Beautiful", mm: "လှပသော" },
          { en: "Paper", mm: "စက္ကူ" },
          { en: "Drawing", mm: "ပုံဆွဲခြင်း" },
        ],
      },
      {
        en: "Firefighter",
        mm: "မီးသတ်သမား",
        hints: [
          { en: "Fire", mm: "မီး" },
          { en: "Water", mm: "ရေ" },
          { en: "Red truck", mm: "ကားအနီရောင်" },
          { en: "Save", mm: "ကယ်တင်ခြင်း" },
          { en: "Strong", mm: "သန်မာသော" },
        ],
      },
      {
        en: "Police",
        mm: "ရဲ",
        hints: [
          { en: "Uniform", mm: "ယူနီဖောင်း" },
          { en: "Safe", mm: "လုံခြုံရေး" },
          { en: "Catch", mm: "ဖမ်းဆီးခြင်း" },
          { en: "Station", mm: "ရဲစခန်း" },
          { en: "Gun", mm: "သေနတ်" },
        ],
      },
      {
        en: "Astronaut",
        mm: "အာကာသယာဉ်မှူး",
        hints: [
          { en: "Space", mm: "အာကာသ" },
          { en: "Moon", mm: "လ" },
          { en: "Stars", mm: "ကြယ်များ" },
          { en: "Rocket", mm: "ဒုံးပျံ" },
          { en: "Fly", mm: "ပျံသန်းခြင်း" },
        ],
      },
      {
        en: "Scientist",
        mm: "သိပ္ပံပညာရှင်",
        hints: [
          { en: "Lab", mm: "ဓာတ်ခွဲခန်း" },
          { en: "Study", mm: "လေ့လာခြင်း" },
          { en: "Test", mm: "စမ်းသပ်ခြင်း" },
          { en: "Brain", mm: "ဦးနှောက်" },
          { en: "Discovery", mm: "ရှာဖွေတွေ့ရှိမှု" },
        ],
      },
      {
        en: "Soldier",
        mm: "စစ်သား",
        hints: [
          { en: "War", mm: "စစ်ပွဲ" },
          { en: "Country", mm: "နိုင်ငံတော်" },
          { en: "Uniform", mm: "ယူနီဖောင်း" },
          { en: "March", mm: "စစ်ကြောင်းချီခြင်း" },
          { en: "Protect", mm: "ကာကွယ်ခြင်း" },
        ],
      },
      {
        en: "Singer",
        mm: "အဆိုတော်",
        hints: [
          { en: "Song", mm: "သီချင်း" },
          { en: "Voice", mm: "အသံ" },
          { en: "Music", mm: "ဂီတ" },
          { en: "Stage", mm: "စင်မြင့်" },
          { en: "Microphone", mm: "မိုက်" },
        ],
      },
      {
        en: "Driver",
        mm: "ယာဉ်မောင်း",
        hints: [
          { en: "Car", mm: "ကား" },
          { en: "Road", mm: "လမ်း" },
          { en: "Wheel", mm: "စီယာတိုင်" },
          { en: "Travel", mm: "ခရီးသွားခြင်း" },
          { en: "License", mm: "လိုင်စင်" },
        ],
      },
      {
        en: "Journalist",
        mm: "သတင်းထောက်",
        hints: [
          { en: "News", mm: "သတင်း" },
          { en: "Interview", mm: "လူတွေ့မေးမြန်းခြင်း" },
          { en: "Write", mm: "ရေးသားခြင်း" },
          { en: "TV", mm: "တီဗီ" },
          { en: "Truth", mm: "အမှန်တရား" },
        ],
      },
      {
        en: "Photographer",
        mm: "ဓာတ်ပုံဆရာ",
        hints: [
          { en: "Camera", mm: "ကင်မရာ" },
          { en: "Picture", mm: "ပုံ" },
          { en: "Flash", mm: "မီးရောင်" },
          { en: "Memory", mm: "အမှတ်တရ" },
          { en: "Beauty", mm: "အလှအပ" },
        ],
      },
    ],
  },

  // Artist
  // {
  //   id: "artist",
  //   name: "Artist",
  //   nameMm: "အနုပညာရှင်",
  //   icon: "🎨",
  //   words: [
  //     { en: "Leonardo da Vinci", mm: "လီယိုနာဒို ဒါဗင်ချီ" },
  //     { en: "Pablo Picasso", mm: "ပါဘလို ပီကာဆို" },
  //     { en: "Vincent van Gogh", mm: "ဗင်းဆင့် ဗန်ဂို" },
  //     { en: "Frida Kahlo", mm: "ဖရီဒါ ကာလို" },
  //     { en: "Michelangelo", mm: "မိုက်ကယ်လ်အန်ဂျလို" },
  //     { en: "Claude Monet", mm: "ကလော့ မိုနေး" },
  //     { en: "Salvador Dali", mm: "ဆာလ်ဗေဒေါ ဒါလီ" },
  //     { en: "Andy Warhol", mm: "အင်ဒီ ဝေါဟော" },
  //     { en: "Rembrandt", mm: "ရမ်ဘရန့်" },
  //   ],
  // },

  // Famous Person
  // {
  //   id: "famous",
  //   name: "Famous Person",
  //   nameMm: "နာမည်ကြီးသူ",
  //   icon: "⭐",
  //   words: [
  //     { en: "Elon Musk", mm: "အီလွန် မတ်စ်" },
  //     { en: "Albert Einstein", mm: "အဲလ်ဘတ် အိုင်းစတိုင်း" },
  //     { en: "Cristiano Ronaldo", mm: "ခရစ်စတီယာနို ရိုနာလ်ဒို" },
  //     { en: "Taylor Swift", mm: "တေလာ ဆွစ်ဖ်" },
  //     { en: "Steve Jobs", mm: "စတီးဗ် ဂျော့ဘ်စ်" },
  //     { en: "Mark Zuckerberg", mm: "ဇူကာဘတ်" },
  //     { en: "Michael Jackson", mm: "မိုက်ကယ် ဂျက်ဆင်" },
  //     { en: "Lionel Messi", mm: "လိုင်ယနယ် မက်ဆီ" },
  //   ],
  // },

  {
    id: "season",
    name: "Season",
    nameMm: "ရာသီ",
    icon: "🌦️",
    words: [
      { en: "Summer", mm: "နွေရာသီ" },
      { en: "Winter", mm: "ဆောင်းရာသီ" },
      { en: "Spring", mm: "နွေဦးရာသီ" },
      { en: "Rainy Season", mm: "မိုးရာသီ" },
      { en: "Snowfall", mm: "နှင်းကျ" },
      { en: "Tornado", mm: "လေဆင်နှာမောင်း" },
      { en: "Tsunami", mm: "ဆူနာမီ" },
      { en: "Earthquake", mm: "ငလျင်" },
      { en: "Rainbow", mm: "သက်တံ" },
      { en: "Thunder", mm: "မိုးကြိုး" },
      { en: "Heatwave", mm: "အပူလှိုင်း" },
      { en: "Blizzard", mm: "နှင်းမုန်တိုင်း" },
      { en: "New Year", mm: "နှစ်သစ်ကူး" },
      { en: "Thadingyut", mm: "သီတင်းကျွတ်" },
      { en: "Christmas", mm: "ခရစ္စမတ်" },
      { en: "Thingyan", mm: "သင်္ကြန်" },
      { en: "Full Moon Day", mm: "လပြည့်နေ့" },
    ],
  },
  {
    id: "fruit",
    name: "Fruit",
    nameMm: "အသီး",
    icon: "🍎",
    words: [
      {
        en: "Apple",
        mm: "ပန်းသီး",
        hints: [
          { en: "Red", mm: "အနီရောင်" },
          { en: "Sweet", mm: "အချို" },
          { en: "Crunchy", mm: "အကြွပ်" },
          { en: "Fruit", mm: "သစ်သီး" },
          { en: "Healthy", mm: "ကျန်းမာရေးနှင့်ညီညွတ်သော" },
        ],
      },
      {
        en: "Watermelon",
        mm: "ဖရဲသီး",
        hints: [
          { en: "Green outside", mm: "အပြင်ခွံအစိမ်း" },
          { en: "Red inside", mm: "အတွင်းသားအနီ" },
          { en: "Watery", mm: "အရည်ရွှမ်းသော" },
          { en: "Big", mm: "ကြီးမားသော" },
          { en: "Summer", mm: "နွေရာသီ" },
        ],
      },
      {
        en: "Coconut",
        mm: "အုန်းသီး",
        hints: [
          { en: "Hard shell", mm: "မာသောအခွံ" },
          { en: "White inside", mm: "အတွင်းသားအဖြူ" },
          { en: "Juice", mm: "ဖျော်ရည်" },
          { en: "Beach", mm: "ကမ်းခြေ" },
          { en: "Oil", mm: "ဆီ" },
        ],
      },
      {
        en: "Pineapple",
        mm: "နာနတ်သီး",
        hints: [
          { en: "Yellow", mm: "အဝါရောင်" },
          { en: "Spiky", mm: "ဆူးများသော" },
          { en: "Sweet and Sour", mm: "ချိုချဉ်" },
          { en: "Crown", mm: "အမောက်/သရဖူ" },
          { en: "Juicy", mm: "အရည်ရွှမ်းသော" },
        ],
      },
      {
        en: "Mango",
        mm: "သရက်သီး",
        hints: [
          { en: "Yellow", mm: "အဝါရောင်" },
          { en: "Sweet", mm: "အချို" },
          { en: "Summer", mm: "နွေရာသီ" },
          { en: "King of fruits", mm: "သစ်သီးများ၏ဘုရင်" },
          { en: "Myanmar", mm: "မြန်မာနိုင်ငံ" },
        ],
      },
      {
        en: "Avocado",
        mm: "ထောပတ်သီး",
        hints: [
          { en: "Green", mm: "အစိမ်းရောင်" },
          { en: "Soft", mm: "နူးညံ့သော" },
          { en: "Creamy", mm: "ထောပတ်လိုဆိမ့်သော" },
          { en: "Seed", mm: "အစေ့" },
          { en: "Healthy fats", mm: "ကျန်းမာရေးနှင့်ညီညွတ်သောအဆီ" },
        ],
      },
      {
        en: "Banana",
        mm: "ငှက်ပျောသီး",
        hints: [
          { en: "Yellow", mm: "အဝါရောင်" },
          { en: "Long", mm: "အရှည်" },
          { en: "Soft", mm: "ပျော့ပျောင်းသော" },
          { en: "Monkey", mm: "မျောက်" },
          { en: "Peel", mm: "အခွံခွာခြင်း" },
        ],
      },
      {
        en: "Strawberry",
        mm: "စတော်ဘယ်ရီ",
        hints: [
          { en: "Red", mm: "အနီရောင်" },
          { en: "Small", mm: "သေးငယ်သော" },
          { en: "Sour", mm: "အချဉ်" },
          { en: "Heart shape", mm: "နှလုံးသားပုံစံ" },
          { en: "Cold place", mm: "အေးသောဒေသ" },
        ],
      },
      {
        en: "Grape",
        mm: "စပျစ်သီး",
        hints: [
          { en: "Purple or Green", mm: "အညို သို့မဟုတ် အစိမ်း" },
          { en: "Small circles", mm: "အလုံးလေးများ" },
          { en: "Bunch", mm: "အခိုင်လိုက်" },
          { en: "Sweet", mm: "အချို" },
          { en: "Wine", mm: "ဝိုင်" },
        ],
      },
      {
        en: "Lime",
        mm: "သံပရာသီး",
        hints: [
          { en: "Green", mm: "အစိမ်းရောင်" },
          { en: "Sour", mm: "အချဉ်" },
          { en: "Small", mm: "သေးငယ်သော" },
          { en: "Juice", mm: "ဖျော်ရည်" },
          { en: "Vitamin C", mm: "ဗီတာမင် စီ" },
        ],
      },
      {
        en: "Durian",
        mm: "ဒူးရင်းသီး",
        hints: [
          { en: "Smelly", mm: "အနံ့ပြင်းသော" },
          { en: "Spiky", mm: "ဆူးများသော" },
          { en: "Yellow inside", mm: "အတွင်းသားအဝါ" },
          { en: "Expensive", mm: "စျေးကြီးသော" },
          { en: "Strong taste", mm: "အရသာပြင်းသော" },
        ],
      },
      {
        en: "Mangosteen",
        mm: "မင်းကွတ်သီး",
        hints: [
          { en: "Purple outside", mm: "အပြင်ခွံအညိုရင့်" },
          { en: "White inside", mm: "အတွင်းသားအဖြူ" },
          { en: "Sweet", mm: "အချို" },
          { en: "Queen of fruits", mm: "သစ်သီးများ၏မိဖုရား" },
          { en: "Sections", mm: "အမြွှာများ" },
        ],
      },
      {
        en: "Papaya",
        mm: "သင်္ဘောသီး",
        hints: [
          { en: "Orange inside", mm: "အတွင်းသားလိမ္မော်ရောင်" },
          { en: "Black seeds", mm: "အစေ့အမည်းများ" },
          { en: "Long", mm: "အရှည်" },
          { en: "Sweet", mm: "အချို" },
          { en: "Salad", mm: "အသုပ်" },
        ],
      },
      {
        en: "Orange",
        mm: "လိမ္မော်သီး",
        hints: [
          { en: "Round", mm: "အဝိုင်း" },
          { en: "Orange color", mm: "လိမ္မော်ရောင်" },
          { en: "Juicy", mm: "အရည်ရွှမ်းသော" },
          { en: "Sour and Sweet", mm: "ချိုချဉ်" },
          { en: "Vitamin C", mm: "ဗီတာမင် စီ" },
        ],
      },
      {
        en: "Dragon Fruit",
        mm: "နဂါးမောက်သီး",
        hints: [
          { en: "Pink outside", mm: "အပြင်ခွံပန်းရောင်" },
          { en: "White or Red inside", mm: "အတွင်းသားအဖြူ သို့ အနီ" },
          { en: "Black seeds", mm: "အစေ့အမည်းလေးများ" },
          { en: "Cactus", mm: "ရှားစောင်းနွယ်ဝင်" },
          { en: "Beautiful", mm: "လှပသော" },
        ],
      },
      {
        en: "Pomelo",
        mm: "ကျွဲကောသီး",
        hints: [
          { en: "Big", mm: "ကြီးမားသော" },
          { en: "Green skin", mm: "အခွံအစိမ်း" },
          { en: "Thick skin", mm: "အခွံထူသော" },
          { en: "Pink inside", mm: "အတွင်းသားပန်းရောင်" },
          { en: "Sour and Sweet", mm: "ချိုချဉ်" },
        ],
      },
      {
        en: "Guava",
        mm: "မာလကာသီး",
        hints: [
          { en: "Green", mm: "အစိမ်းရောင်" },
          { en: "Hard", mm: "မာသော" },
          { en: "White or Pink", mm: "အတွင်းသားအဖြူ သို့ ပန်းရောင်" },
          { en: "Seeds", mm: "အစေ့များ" },
          { en: "Crunchy", mm: "အကြွပ်" },
        ],
      },
      {
        en: "Lychee",
        mm: "လိုင်ချီးသီး",
        hints: [
          { en: "Red shell", mm: "အခွံအနီ" },
          { en: "White inside", mm: "အတွင်းသားအဖြူ" },
          { en: "Sweet", mm: "အချို" },
          { en: "Juicy", mm: "အရည်ရွှမ်းသော" },
          { en: "One big seed", mm: "အစေ့ကြီးတစ်စေ့" },
        ],
      },
      {
        en: "Jackfruit",
        mm: "ပိန္နဲသီး",
        hints: [
          { en: "Huge", mm: "အလွန်ကြီးမားသော" },
          { en: "Yellow", mm: "အဝါရောင်" },
          { en: "Sticky", mm: "စေးကပ်သော" },
          { en: "Strong smell", mm: "အနံ့ပြင်းသော" },
          { en: "Sweet", mm: "အချို" },
        ],
      },
      {
        en: "Pomegranate",
        mm: "သလဲသီး",
        hints: [
          { en: "Red seeds", mm: "အစေ့အနီများ" },
          { en: "Juice", mm: "ဖျော်ရည်" },
          { en: "Healthy", mm: "ကျန်းမာရေးနှင့်ညီညွတ်သော" },
          { en: "Many seeds", mm: "အစေ့များပြားသော" },
          { en: "Round", mm: "အဝိုင်းပုံ" },
        ],
      },
    ],
  },
];
