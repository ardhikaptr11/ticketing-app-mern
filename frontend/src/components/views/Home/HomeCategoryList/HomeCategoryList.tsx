import DisplayCard from "@/components/ui/DisplayCard";
import { ICategory } from "@/types/Category";
import { sortCategoriesByAlphabet } from "@/utils/sort";

interface PropTypes {
    title: string;
    dataCategories: ICategory[];
    isLoadingCategories: boolean;
}

const HomeCategoryList = (props: PropTypes) => {
    const { title, dataCategories, isLoadingCategories } = props;

    return (
        <section className="mx-6 mt-16 rounded-xl border border-default-300 p-4 shadow-xl lg:mx-0">
            <h2 className="mb-2 px-6 text-2xl font-bold text-danger lg:px-0">
                {title}
            </h2>
            <div className="grid auto-cols-[8rem] grid-flow-col gap-4 overflow-x-auto py-2 pb-4 lg:grid-cols-8 lg:px-1">
                {!isLoadingCategories
                    ? sortCategoriesByAlphabet(dataCategories).map(
                          (category: ICategory) => (
                              <DisplayCard
                                  key={`card-category-${category._id}`}
                                  type="category"
                                  data={category}
                                  className="border"
                              />
                          ),
                      )
                    : Array.from({ length: 8 }).map((_, index) => (
                          <DisplayCard
                              key={`card-category-skeleton-${index}`}
                              type="category"
                              className="first:ml-6 last:mr-6 lg:first:ml-0 lg:last:mr-0"
                              isLoading={isLoadingCategories}
                          />
                      ))}
            </div>
        </section>
    );
};

export default HomeCategoryList;
