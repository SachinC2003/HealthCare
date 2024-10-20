'use server';
/*import prisma from '../../lib/prisma'

export const getUser = async (userId : number) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        return user;  
    } catch (error) {
        console.log(error);
    }
}*/
import prisma from '../../lib/prisma'
export const getUser = async (userId: string) => {
    try {
        console.log(userId, typeof(userId));
        const n_userId = parseInt(userId)
        if (isNaN(n_userId)) {
            throw new Error('Invalid user ID');
        }

        const user = await prisma.user.findUnique({
            where: {
                id: n_userId
            }
        });
        return user;
    } catch (error) {
        console.log(error);
    }
}
