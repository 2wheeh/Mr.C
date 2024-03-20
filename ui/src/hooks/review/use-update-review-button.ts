import { useParams, useRouter } from 'next/navigation';

import { useReview } from '@/context/review/review-context';
import { useToast } from '@/context/common/toast-context';
import { useApiError } from '@/hooks/common/use-api-error';
import { updateReview } from '@/lib/apis/review/client';

export function useUpdateReivewButton() {
  const router = useRouter();
  const { id } = useParams();
  const { emitToast } = useToast();

  const { disabled, setDisabled, validateAndGetData } = useReview();
  const { handleApiError } = useApiError();

  const handleUpdateReview = async () => {
    const data = validateAndGetData();

    if (!data) {
      return;
    }

    try {
      await updateReview(Number(id), data);

      emitToast('리뷰 수정 완료', 'success');
      router.refresh();
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleClick = async () => {
    setDisabled(true);
    await handleUpdateReview();
    setDisabled(false);
  };

  return { disabled, handleClick: (): void => void handleClick() };
}