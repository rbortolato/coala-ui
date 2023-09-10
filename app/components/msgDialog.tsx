import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";

interface IProps {
    title: string;
    msg: string;
    open: boolean;
    handleOk: () => void;
}
const MsgDialog = ({
    title,
    msg,
    open,
    handleOk
}: IProps) => {
    return (
        <Dialog
            open={open}
        >
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {msg}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleOk}>OK</Button>
            </DialogActions>
        </Dialog>
    );
};

export default MsgDialog;
