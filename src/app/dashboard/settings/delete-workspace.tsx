'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import * as Icons from '@/components/ui/icons';

const DeleteWorkspace = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-title">{`Danger Zone`}</CardTitle>
        <CardDescription className="flex items-center">
          Delete Workspace
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="destructive"
              className="font-title"
            >{`Delete Workspace`}</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-title">{`Delete Workspace`}</DialogTitle>
              <DialogDescription>{`Are you really sure? This is going to delete all data associated.`}</DialogDescription>
            </DialogHeader>
            <div className="flex items-center font-bold text-destructive">
              <Icons.Warning className="mr-2 h-6 w-6" />
              <p>This action cannot be reverted</p>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary">Cancel</Button>
              </DialogClose>
              <Button variant="destructive">
                {`I'm sure. Delete this workspace`}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default DeleteWorkspace;
