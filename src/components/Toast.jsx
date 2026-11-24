import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearToast } from '../store/productReducer';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

export function Toast() {
    const dispatch = useDispatch();
    const toast = useSelector((state) => state.product.toast);

    useEffect(() => {
        if (!toast) return;
        const timer = setTimeout(() => dispatch(clearToast()), 2500);
        return () => clearTimeout(timer);
    }, [toast]);

    if (!toast) return null;

    const isAdd = toast.type === 'add';

    return (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-3 rounded-full shadow-lg text-white text-sm font-medium transition-all ${isAdd ? 'bg-yellow-400' : 'bg-gray-700'}`}>
            {isAdd
                ? <CheckCircleIcon fontSize="small" />
                : <RemoveCircleIcon fontSize="small" />
            }
            {toast.message}
        </div>
    );
}
