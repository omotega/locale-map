import { Iuser, userModel } from '../model/usermodel';
import { Types } from 'mongoose';

async function exists(id: Types.ObjectId): Promise<boolean> {
  const user = await userModel.exists({ _id: id, active: true });
  return user !== null && user !== undefined;
}

async function findUserById(id: Types.ObjectId): Promise<Iuser | null> {
  return userModel
    .findOne({ _id: id, active: true })
    .select('-password -apiKey')
    .lean()
    .exec();
}

async function findUserByEmail(email: string): Promise<Iuser | null> {
  return userModel.findOne({ email: email }).select('-apiKey').lean().exec();
}

async function findUserByApiKey(key: string): Promise<Iuser | null> {
  return userModel.findOne({ apiKey: key }).select('-password ').lean().exec();
}
async function findFieldsById(
  id: Types.ObjectId,
  ...fields: string[]
): Promise<Iuser | null> {
  return userModel
    .findOne({ _id: id, active: true }, [...fields])
    .lean()
    .exec();
}
async function create(user: Iuser): Promise<{ user: Iuser }> {
  const createdUser = await userModel.create(user);
  return {
    user: { ...createdUser.toObject() }
  };
}

async function update(user: Iuser): Promise<{ user: Iuser }> {
  await userModel.updateOne({ _id: user._id }, { $set: { ...user } });
  return {
    user: user
  };
}

async function updateInfo(user: Iuser): Promise<Iuser | null> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return userModel
    .updateOne({ _id: user._id }, { $set: { ...user } })
    .lean()
    .exec();
}

export default {
  exists,
  findUserById,
  findUserByEmail,
  create,
  update,
  updateInfo,
  findUserByApiKey,
  findFieldsById
};
