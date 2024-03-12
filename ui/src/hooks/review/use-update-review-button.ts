import { useParams, useRouter } from 'next/navigation';

import { useToast } from '@/context/common/toast-context';
import { useEditable } from '@/context/review/editable-context';
import { useReview } from '@/context/review/review-context';

import { useApiError } from '@/hooks/common/use-api-error';

import { updateReview } from '@/lib/apis/review/client';

export function useUpdateReivewButton() {
  const router = useRouter();
  const { id } = useParams();
  const { emitToast } = useToast();

  const { setIsEditable } = useEditable() ?? {};
  const { disabled, setDisabled, validateAndGetData } = useReview();
  const { handleApiError } = useApiError();

  const handleUpdateReview = async () => {
    if (!setIsEditable) return;

    setDisabled(true);

    const data = validateAndGetData();

    if (!data) {
      return;
    }

    try {
      await updateReview(Number(id), data);

      setIsEditable(false);
      emitToast('리뷰 수정 완료', 'success');
      router.refresh();
    } catch (error) {
      handleApiError(error);
    } finally {
      setDisabled(false);
    }
  };

  const handleClick = () => {
    void handleUpdateReview();
  };

  return { disabled, handleClick };
}
