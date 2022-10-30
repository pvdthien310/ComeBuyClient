import { toast } from 'react-toastify';

const callToast = {
    distributionToAllToast: (data) => {
        toast.success(`${data.fromBranch} distributed ${data.amount}(s) ${data.productName} per branch`, {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: 'dark',
        });
    },
    distributionToOneToast: (data) => {
        toast.success(`${data.fromBranch} distributed to your branch ${data.amount}(s) ${data.productName}`, {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: 'dark',
        });
    },
    newReqToast: (fromBranchId) => {
        toast.info(`Got a new product request from branch ${fromBranchId}`, {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: 'dark',
        });
    },
    cancelAllToast: (data) => {
        toast.error(`${data.userId} just cancelled all requests in branch`, {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: 'dark',
        });
    },
    declineAllToast: (data) => {
        toast.error(`${data.userId} just declined all requests to branch`, {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: 'dark',
        });
    },
    cancelOneToast: (data) => {
        toast.error(`Request ${data.request.requestProductId} was cancelled`, {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: 'dark',
        });
    },
    declineOneToast: (data) => {
        toast.warning(`Request ${data.request.requestProductId} was declined`, {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: 'dark',
        });
    },
    dealSingleToast: (data) => {
        toast.success(`Request ${data.request.requestProductId} was handled. Check at response tab`, {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: 'colored',
        });
    },
    dealMultipleToast: (data) => {
        toast.info(`${data.branchId} deal all request to them`, {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: 'colored',
        });
    },
};

export default callToast;
