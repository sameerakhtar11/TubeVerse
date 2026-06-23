import User from "../model/userModel.js"
import Channel from "../model/channelModel.js";
import uploadOnCloudinary from "../config/cloudinary.js";

export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User found", user })
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch getcurrent user", error })
    }
}
export const createChannel = async (req, res) => {
    try {
        const { name, description, category } = req.body;
        const userId = req.userId;

        // Check user
        if (!userId) {
            return res.status(401).json({
                message: "User not authenticated",
            });
        }

        // Validate fields
        if (!name || !description || !category) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        // Check if user exists
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        // Check if channel already exists for user
        const existingChannel = await Channel.findOne({
            owner: userId,
        });

        if (existingChannel) {
            return res.status(400).json({
                message: "Channel already exists",
            });
        }

        // Check unique channel name
        const nameExists = await Channel.findOne({
            name: name.trim(),
        });

        if (nameExists) {
            return res.status(400).json({
                message: "Channel name already exists",
            });
        }

        let avatar = null;
        let banner = null;

        // Upload avatar
        if (req.files?.avatar?.length > 0) {
            avatar = await uploadOnCloudinary(
                req.files.avatar[0].path
            );
        }

        // Upload banner
        if (req.files?.banner?.length > 0) {
            banner = await uploadOnCloudinary(
                req.files.banner[0].path
            );
        }

        // Create channel
        const channel = new Channel({
            name: name.trim(),
            description,
            category,
            owner: userId,
            avatar: avatar || "",
            banner: banner || "",
        });

        // Save channel
        await channel.save();

        // Update user
        await User.findByIdAndUpdate(
            userId,
            {
                channel: channel._id,
                userName: name.trim(),
                photoUrl: avatar || user.photoUrl,
            },
            {
                returnDocument: 'after',
            }
        );

        return res.status(201).json({
            success: true,
            message: "Channel created successfully",
            channel,
        });
    } catch (error) {
        console.log("Create Channel Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create channel",
        });
    }
};

export const getChannelData = async (req, res) => {
    try {
        const userId = req.userId;
        const channel = await Channel.findOne({ owner: userId }).populate("owner");
        if (!channel) {
            return res.status(404).json({
                message: "Channel not found",
            })
        }


        return res.status(200).json({
            success: true,
            message: "Channel Data",
            channel
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to get channel data",
            error
        })
    }
}

export const updateChannel = async (req, res) => {
    try {
        const { name, description, category } = req.body;
        const userId = req.userId;

        // Check user
        if (!userId) {
            return res.status(401).json({
                message: "User not authenticated",
            });
        }

        // Validate fields
        if (!name || !description || !category) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        // Check if user exists
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        // Check if channel already exists for user
        const channel = await Channel.findOne({
            owner: userId,
        });

        if (!channel) {
            return res.status(404).json({
                message: "Channel not found",
            });
        }
        if (name && name !== channel.name) {

            const nameExists = await Channel.findOne({
                name: name.trim(),

            });
            if (nameExists) {
                return res.status(400).json({
                    message: "Channel name already exists",
                });
            }
            channel.name = name.trim();
            user.userName = name.trim();

        }
        if (description !== undefined && description !== channel.description) {
            channel.description = description;
        }
        if (category !== undefined && category !== channel.category) {
            channel.category = category;
        }


        if (req.files?.avatar?.length > 0) {
            const avatar = await uploadOnCloudinary(
                req.files.avatar[0].path
            );
            channel.avatar = avatar;
            user.photoUrl = avatar;

        }


        if (req.files?.banner?.length > 0) {
            const banner = await uploadOnCloudinary(
                req.files.banner[0].path
            );
            channel.banner = banner;

        }
        await user.save();
        await channel.save();


        return res.status(200).json({
            success: true,
            message: "Channel updated successfully",
            channel,
            user
        })

    }
    catch (error) {
        console.log("Update Channel Error:", error);

        return res.status(500).json({
            success: false,
            message: `Failed to update Channel ${error.message}`,
        });
    }
}
