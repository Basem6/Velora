import { CardLove } from "./CardinLovepage";
import { useContext , useState} from "react";
import { CartContext } from "../Context/Productscontext";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useToast } from "../Context/Toastcontext";
export default function WishlistPage() {
    const { showAlert } = useToast()
    const [current ,setcurrent] =useState(0)
    const [open, setOpen] = useState(false);
    const handleClickOpen = (e) => {
            setOpen(true);
            setcurrent(e)
    };
    const handleClose = () => {
            setOpen(false);
    }
    const {state , dispatch} = useContext(CartContext)
    function confirmAgree(){
        showAlert("success","removed from Lovesproduct")
        setOpen(false);
        dispatch({
            type:"removefromlove",
            payload:current
        })
    }
    const products = state.filter((product)=>{
            return product.addtoLove === true
    })
    const filter=state.filter((item) => {
        return item.addtocard===true
    });
    function handleAddtocard(id){
        console.log(id)
        showAlert("success","added to card successfully")
        if (filter.includes(state[id-1])) {
            console.log("exist")
            dispatch({
            type: "plusItem",
            payload: id-1,
            });
        } else {
            dispatch({
            type: "addedcart",
            payload: { id },
            });
        }
    }
    return (
        <>
        <Dialog
                    open={open}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                    role="alertdialog"
                >
                    <DialogTitle>{"Use Google's location service?"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Disagree
                    </Button>
                    <Button onClick={confirmAgree}>Agree</Button>
                    </DialogActions>
        </Dialog>
        <main className="max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-24 min-h-screen overflow-hidden w-full py-16  relative mt-12" style={{ backgroundColor: '#0D0D0D' }}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
            <h1 className="text-4xl font-bold" style={{ color: '#F0ECE4', fontFamily: "'Playfair Display', serif" }}>
                My Wishlist
            </h1>
            <p className="mt-2" style={{ color: 'rgba(240,236,228,0.6)' }}>
                {products.length} items saved to your collection
            </p>
            </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {state.map((product, index) => {
            if (product.addtoLove === true) {
                return (
                    <CardLove
                        product={product}
                        handleClickOpen={handleClickOpen}
                        handleAddtocard={handleAddtocard}
                        keye={index}
                        key={index+1}
                    />
                );
            }
        })}
        </div>
        </main>
        </>
    );
    }