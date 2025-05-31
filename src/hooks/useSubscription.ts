'use client'
import { Subscription } from "@/types/subscription";
import { useAuth } from "./useAuth";
import { useEffect, useState } from "react";
import { getSubscriptionById } from "@/services/subscription";

export const useSubscription = () => {
    const { user, isLoading } = useAuth();
    const [subscription, setSubscription] = useState<Subscription>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getSubscription = async () => {
        if (!user?.subscription) return;
        try {
            setLoading(true);
            setError(null);
            const response = await getSubscriptionById(user.subscription.id);
            setSubscription(response);
        } catch (err) {
            console.error('Subscription fetch error:', err);
            setError('Failed to fetch subscription');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isLoading) return;

        if (user?.subscription) {
            getSubscription();
        }
    }, [user, isLoading]);

    return {
        subscription,
        loading,
        error,
        refetch: getSubscription
    };
}