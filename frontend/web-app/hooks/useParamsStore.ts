import { create } from 'zustand';

type State = {
    pageNumber: number;
    pageSize: number;
    pageCount: number;
    searchTerm: string;
    orderBy: string;
    filterBy: string;
    levelFilter: string;
}

type Actions = {
    setParams: (params: Partial<State>) => void;
    resetParams: () => void;
}

const initialState: State = {
    pageNumber: 1,
    pageSize: 12,
    pageCount: 1,
    searchTerm: '',
    orderBy:'courseTitle',
    filterBy: '',
    levelFilter:''
}

export const useParamsStore = create<State & Actions>((set)=> ({
    ...initialState,

    setParams: (newParams: Partial<State>) => {
        set ((state) => {
            if(newParams.pageNumber){
                return {...state, pageNumber: newParams.pageNumber}
            } else{ 
                return{...state, ...newParams}
            }
        })
    },

    resetParams: () => set(initialState)
}))