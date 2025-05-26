'use client'
import { Subscription } from "@/types/subscription";
import { useAuth } from "./useAuth";
import { useEffect, useState } from "react";
import { getSubscriptionById } from "@/services/subscription";


export const useSubscription = () => {
    const { user } = useAuth();
    const [subscription, setSubscription] = useState<Subscription>();

    const getSubscription = async () => {
        if (user && user.subscription) {
            const response = await getSubscriptionById(user.subscription);
            setSubscription(response);
        }
    }

    useEffect(() => {
        if (user) {
            getSubscription();
        }
    }, [user]);

    return {
        subscription
    }
}