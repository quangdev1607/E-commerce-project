import { useMemo } from "react";
import { generateRange } from "../utils/helpers";

const usePagination = (totalProductCount, currentPage, siblingCount = 1) => {
  const paginationArray = useMemo(() => {
    const pageSize = import.meta.env.VITE_LIMIT || 10;
    const paginationCount = Math.ceil(totalProductCount / pageSize);
    const totalPaginationItems = siblingCount + 5;

    if (paginationCount <= totalPaginationItems) return generateRange(1, paginationCount);

    const isShowLeft = currentPage - siblingCount > 2;
    const isShowRight = currentPage + siblingCount < paginationCount - 1;

    if (isShowLeft && !isShowRight) {
      const rightStart = paginationCount - 4;
      const rightRange = generateRange(rightStart, paginationCount);
      return [1, "...", ...rightRange];
    }

    if (!isShowLeft && isShowRight) {
      const leftRange = generateRange(1, 5);
      return [...leftRange, "...", paginationCount];
    }

    const siblingLeft = Math.max(currentPage - siblingCount, 1);
    const siblingRight = Math.min(currentPage + siblingCount, paginationCount);

    if (isShowLeft && isShowRight) {
      const middleRange = generateRange(siblingLeft, siblingRight);
      return [1, "...", ...middleRange, "...", paginationCount];
    }
  }, [totalProductCount, currentPage, siblingCount]);
  return paginationArray;
};

export default usePagination;

/*
- first + last + current + sibling + 2Dots
- min = 6 => sibling + 5
- totalPagination : 66, limitProduct: 12 => 5.5 round to 6
- totalPaginationItems: sibling + 5 = 6
- sibling = 1


[1,2,3,4,5,6]
[1,...,6,7,8,9,10]
[1,2,3,4,5,...,10]
[1,...,5,6,7,...,10]
*/
