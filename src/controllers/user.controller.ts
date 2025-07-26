import { Request, Response } from 'express';
import { handleCreateUser, getAllUsers, handleDeleteUser, getUserById, updateUserById } from 'services/user.service';

const getHomePage = async (req: Request, res: Response) => {
    const users = await getAllUsers();
    return res.render(
        'home',
        {
            users: users,
        }

    );
}

const getCreateUserPage = (req: Request, res: Response) => {
    return res.render('admin/user/create.ejs');
}

const postCreateUser = async (req: Request, res: Response) => {
    const { fullName, email, address } = req.body;

    // handle create user 
    await handleCreateUser(fullName, email, address);

    return res.redirect('/');
}

const postDeleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    await handleDeleteUser(req.params.id);
    return res.redirect('/');
}

const getViewUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await getUserById(id);
    return res.render('view-user', {
        id: id,
        user: user
    }
    );
}

const postUpdateUser = async (req: Request, res: Response) => {
    const { id, fullName, email, address } = req.body;
    await updateUserById(id, fullName, email, address);
    return res.redirect('/');
}

export {
    getHomePage,
    getCreateUserPage,
    postCreateUser,
    postDeleteUser,
    getViewUser,
    postUpdateUser
};