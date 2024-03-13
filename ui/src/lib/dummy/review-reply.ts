import type { ListRepliesResponse } from '@/lib/definitions/review';

const dummyRepliesList: ListRepliesResponse = {
  pagination: {
    pageOffset: 1,
    pageSize: 10,
    totalEntryCount: 7,
    totalPageCount: 3,
    direction: 'desc',
  },
  replies: [
    {
      id: 1,
      reviewId: 1,
      userId: '7289ae9c-42b1-49ca-8f5b-a1831583e903',
      nickname: '신비로운 평론가 붉은 여우',
      tag: '#MQ3B',
      content: '나쁜 리뷰 좋은 리뷰 나쁜 말 좋은 말 최고 돼지 강아지',
      createdAt: '2024-02-28T15:08:00+09:00',
      updatedAt: '2024-02-28T15:08:00+09:00',
    },
    {
      id: 2,
      reviewId: 1,
      userId: '7289ae9c-42b1-49ca-8f5b-a1831583e904',
      nickname: '묘한 시네필 에메랄드빛 말',
      tag: '#TE3T',
      content:
        '좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰',
      createdAt: '2024-02-28T15:08:00+09:00',
      updatedAt: '2024-02-28T15:08:00+09:00',
    },
    {
      id: 3,
      reviewId: 1,
      userId: '7289ae9c-42b1-49ca-8f5b-a1831583e904',
      nickname: '묘한 시네필 에메랄드빛 말',
      tag: '#TE3T',
      content:
        '좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰',
      createdAt: '2024-02-28T15:08:00+09:00',
      updatedAt: '2024-02-28T15:08:00+09:00',
    },
    {
      id: 4,
      reviewId: 1,
      userId: '7289ae9c-42b1-49ca-8f5b-a1831583e903',
      nickname: '신비로운 평론가 붉은 여우',
      tag: '#MQ3B',
      content:
        '좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰',
      createdAt: '2024-02-28T15:08:00+09:00',
      updatedAt: '2024-02-28T15:08:00+09:00',
    },
    {
      id: 5,
      reviewId: 1,
      userId: '7289ae9c-42b1-49ca-8f5b-a1831583e903',
      nickname: '신비로운 평론가 붉은 여우',
      tag: '#MQ3B',
      content: '좋은 리뷰 은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰',
      createdAt: '2024-02-28T15:08:00+09:00',
      updatedAt: '2024-02-28T15:08:00+09:00',
    },
    {
      id: 6,
      reviewId: 1,
      userId: '7289ae9c-42b1-49ca-8f5b-a1831583e903',
      nickname: '신비로운 평론가 붉은 여우',
      tag: '#MQ3B',
      content:
        '좋은 리뷰 좋은 리뷰 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰',
      createdAt: '2024-02-28T15:08:00+09:00',
      updatedAt: '2024-02-28T15:08:00+09:00',
    },
    {
      id: 7,
      reviewId: 1,
      userId: '7289ae9c-42b1-49ca-8f5b-a1831583e903',
      nickname: '신비로운 평론가 붉은 여우',
      tag: '#MQ3B',
      content:
        '좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰',
      createdAt: '2024-02-28T15:08:00+09:00',
      updatedAt: '2024-02-28T15:08:00+09:00',
    },
    // {
    //   id: 8,
    //   reviewId: 1,
    //   userId: '7289ae9c-42b1-49ca-8f5b-a1831583e903',
    //   nickname: '신비로운 평론가 붉은 여우',
    //   tag: '#MQ3B',
    //   content:
    //     '좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰',
    //   createdAt: '2024-02-28T15:08:00+09:00',
    //   updatedAt: '2024-02-28T15:08:00+09:00',
    // },
    // {
    //   id: 9,
    //   reviewId: 1,
    //   userId: '7289ae9c-42b1-49ca-8f5b-a1831583e903',
    //   nickname: '신비로운 평론가 붉은 여우',
    //   tag: '#MQ3B',
    //   content:
    //     '좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰',
    //   createdAt: '2024-02-28T15:08:00+09:00',
    //   updatedAt: '2024-02-28T15:08:00+09:00',
    // },
    // {
    //   id: 10,
    //   reviewId: 1,
    //   userId: '7289ae9c-42b1-49ca-8f5b-a1831583e903',
    //   nickname: '신비로운 평론가 붉은 여우',
    //   tag: '#MQ3B',
    //   content:
    //     '좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰 좋은 리뷰',
    //   createdAt: '2024-02-28T15:08:00+09:00',
    //   updatedAt: '2024-02-28T15:08:00+09:00',
    // },
  ],
};

export default dummyRepliesList;
