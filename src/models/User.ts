import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  username: String;
  fullname: String;
  password: String;
  comparePassword: (password: String) => Promise<Boolean>;
}

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
    },
    fullname: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre<IUser>("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (
  password: String
): Promise<Boolean> {
  return await bcrypt.compare(password, this.password);
};

export default model("User", userSchema);
