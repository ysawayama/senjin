export type Category = {
  id: string
  name: string
  slug: string
  emoji: string
  description: string
  color: string
}

export type Story = {
  id: string
  categoryId: string
  catchphrase: string
  senjinName: string
  senjinAge: number
  senjinRole: string
  storyContext: string
  storyEmotion: string
  storyDecision: string
  finalMessage: string
  viewCount: number
  archiveCount: number
  commentCount: number
}

export type Comment = {
  id: string
  storyId: string
  userId: string
  userName: string
  userAvatar?: string
  content: string
  createdAt: string
}

export const categories: Category[] = [
  {
    id: '1',
    name: '進路に悩む',
    slug: 'career-path',
    emoji: '🎓',
    description: '進路選択で悩んでいる人へ',
    color: 'category-path',
  },
  {
    id: '2',
    name: '転職・退職に悩む',
    slug: 'job-change',
    emoji: '💼',
    description: '転職や退職を考えている人へ',
    color: 'category-job',
  },
  {
    id: '3',
    name: '就活に悩む',
    slug: 'job-hunting',
    emoji: '👔',
    description: '就職活動で悩んでいる人へ',
    color: 'category-hunting',
  },
  {
    id: '4',
    name: 'もう詰んだ…',
    slug: 'desperate',
    emoji: '🌧️',
    description: '困難な状況に直面している人へ',
    color: 'category-desperate',
  },
]

export const stories: Story[] = [
  {
    id: '1',
    categoryId: '1',
    catchphrase: '美大に行くか、就職するか。親との対立を乗り越えて見つけた答え',
    senjinName: 'デザイナー・田中さん',
    senjinAge: 18,
    senjinRole: 'UXデザイナー（大手IT企業）',
    storyContext: '高3の秋、美大進学を希望していたが、親は安定した企業への就職を望んでいた。周りの友人は次々と進路を決めていく中、一人だけ取り残された気分だった。',
    storyEmotion: '不安と焦り。親との口論も増え、毎晩泣いていた。でも、絵を描いている時だけは心が落ち着いた。',
    storyDecision: '先生に相談したことがきっかけ。「好きなことで生きていける保証はないけど、好きじゃないことで一生を過ごすのは辛いよ」という言葉が背中を押してくれた。',
    finalMessage: '悩んでいる時間も、あなたの人生の一部。焦らなくていい。あなたの心が本当に望むものは何か、静かに耳を傾けてみて。',
    viewCount: 456,
    archiveCount: 45,
    commentCount: 12,
  },
  {
    id: '2',
    categoryId: '1',
    catchphrase: '理系から文系へ。周りの反対を押し切って進んだ道',
    senjinName: 'ライター・佐藤さん',
    senjinAge: 19,
    senjinRole: 'フリーランスライター',
    storyContext: '理系学部に在籍していたが、文章を書くことに情熱を感じ、文系への転部を決意。教授や友人からは「もったいない」と言われた。',
    storyEmotion: '孤独感と自己否定。本当にこの道でいいのか、毎日自問自答していた。',
    storyDecision: '自分の書いた文章で誰かが笑顔になった瞬間を見て、「これだ」と確信した。',
    finalMessage: '周りの期待に応えることも大切。でも、自分の心に嘘をつくことの方が、もっと辛い。',
    viewCount: 234,
    archiveCount: 28,
    commentCount: 8,
  },
  {
    id: '3',
    categoryId: '2',
    catchphrase: '5年勤めた会社を辞めた日。後悔と安堵が入り混じった複雑な気持ち',
    senjinName: 'エンジニア・鈴木さん',
    senjinAge: 28,
    senjinRole: 'フリーランスエンジニア',
    storyContext: '新卒で入社した会社で5年間勤務。仕事は安定していたが、毎朝起きるのが辛くなっていた。',
    storyEmotion: '罪悪感と恐怖。辞めることは「逃げ」なのではないかと悩んだ。',
    storyDecision: '体調を崩したことがきっかけ。自分の健康より大切な仕事はないと気づいた。',
    finalMessage: '辞めることは逃げじゃない。次の一歩を踏み出すための勇気だよ。',
    viewCount: 789,
    archiveCount: 92,
    commentCount: 34,
  },
  {
    id: '4',
    categoryId: '3',
    catchphrase: '50社落ちた就活。それでも諦めなかった理由',
    senjinName: '営業・山田さん',
    senjinAge: 22,
    senjinRole: '大手商社営業',
    storyContext: '就活で50社以上の選考に落ちた。周りの友人が次々と内定をもらう中、自分だけが取り残されていく焦りと不安。',
    storyEmotion: '自己否定と絶望。「自分には何の価値もないのではないか」と思い詰めた。',
    storyDecision: '母親の「あなたを必要としている会社は必ずある」という言葉に救われた。',
    finalMessage: '落ちた数は、あなたの価値とは関係ない。あなたを必要としている場所は必ずあるから。',
    viewCount: 1234,
    archiveCount: 156,
    commentCount: 67,
  },
  {
    id: '5',
    categoryId: '4',
    catchphrase: '借金、失業、病気。全てを失った時に見つけた希望',
    senjinName: '起業家・伊藤さん',
    senjinAge: 35,
    senjinRole: 'スタートアップCEO',
    storyContext: '会社が倒産し、借金を抱え、病気も患った。全てを失い、もう終わりだと思った。',
    storyEmotion: '絶望と無力感。「もう何もかも終わった」と思った。',
    storyDecision: '「まだ命がある」と気づいた瞬間。ゼロからやり直す勇気が湧いた。',
    finalMessage: '底まで落ちたら、後は上がるだけ。どんな状況でも、諦めなければ道は開ける。',
    viewCount: 2345,
    archiveCount: 234,
    commentCount: 89,
  },
]

export const comments: Comment[] = [
  {
    id: '1',
    storyId: '1',
    userId: '1',
    userName: '太郎',
    content: 'すごく勇気もらえました！私も今、同じような状況で悩んでいます。',
    createdAt: '2025-11-10T10:00:00Z',
  },
  {
    id: '2',
    storyId: '1',
    userId: '2',
    userName: '花子',
    content: '涙が出ました。ありがとうございます。',
    createdAt: '2025-11-10T11:30:00Z',
  },
  {
    id: '3',
    storyId: '3',
    userId: '3',
    userName: 'けんた',
    content: '辞めることは逃げじゃない、という言葉に救われました。',
    createdAt: '2025-11-11T09:00:00Z',
  },
]

// ヘルパー関数
export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}

export function getStoriesByCategory(categoryId: string): Story[] {
  return stories.filter((s) => s.categoryId === categoryId)
}

export function getStoryById(id: string): Story | undefined {
  return stories.find((s) => s.id === id)
}

export function getCommentsByStoryId(storyId: string): Comment[] {
  return comments.filter((c) => c.storyId === storyId)
}
